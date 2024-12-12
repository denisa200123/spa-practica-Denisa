<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;
use Session;

class CartController extends Controller
{ 
    private function initializeCart(Request $request)
    {
        if (!Session::has('products_in_cart')) {
            Session::put('products_in_cart', []);
        }
    }

    //list all products that aren't in cart
    public function index(Request $request)
    {
        $this->initializeCart($request);

        $productsInCart = Session::get('products_in_cart', []);
        $products = Product::whereNotIn('id', $productsInCart)->get();

        if ($request->expectsJson()) {
            return response()->json($products);
        }
        return view('index');//for non-ajax requests, redirect to main page
    }

    //see products in cart
    public function cart(Request $request)
    {
        $this->initializeCart($request);

        $productsInCart = Session::get('products_in_cart', []);
        $products = Product::whereIn('id', $productsInCart)->get();

        if ($request->expectsJson()) {
            return response()->json($products);
        }
        return view('index');
    }

    //add product to cart
    public function addCart(Request $request, $id)
    {
        try {
            $this->initializeCart($request);
            $productsInCart = Session::get('products_in_cart', []);

            if (!in_array($id, $productsInCart)) {
                $productsInCart[] = $id;
                Session::put('products_in_cart', $productsInCart);
            }

            if ($request->expectsJson()) {
                return response()->json(['success' => __('Product added to cart')]);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => __('The selected product does not exist')], 404);
            }
        }
        return view('index');
    }

    //remove from cart
    public function removeCart(Request $request, $id)
    {
        try {
            $this->initializeCart($request);
            $productsInCart = Session::get('products_in_cart', []);

            if (($key = array_search($id, $productsInCart)) !== false) {
                unset($productsInCart[$key]);
                Session::put('products_in_cart', $productsInCart);
            }

            if ($request->expectsJson()) {
                return response()->json(['success' => __('Product removed from cart')]);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => __('The selected product does not exist')], 404);
            }
        }
        return view('index');
    }

    //send mail
    public function checkout(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'details' => 'required|string',
        ]);

        $productsInCart = Session::get('products_in_cart', []);
        $products = Product::whereIn('id', $productsInCart)->get();
        $totalPrice = $products->sum('price');

        $productsIds = array_values($productsInCart);

        if (!empty(env('USER_EMAIL'))) {
            Mail::to(env('USER_EMAIL'))->send(new OrderConfirmation($productsIds, $request->all()));
        }

        $order = Order::create([
            'customer_name' => $request->name,
            'contact_details' => $request->details,
            'comments' => $request->comments,
            'total_price' => $totalPrice
        ]);

        if ($products->isNotEmpty()) {
            $order->products()->attach($products);
        }

        Session::forget('products_in_cart');

        if ($request->expectsJson()) {
            return response()->json(['success' => __('Order placed successfully')]);
        }
        return view('index');
    }
}
