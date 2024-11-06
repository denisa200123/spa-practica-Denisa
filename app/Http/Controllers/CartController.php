<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;

class CartController extends Controller
{ 
    private function initializeCart(Request $request)
    {
        if (!$request->session()->has('productsInCart')) {
            $request->session()->put('productsInCart', []);
        }
    }

    //list all products that aren't in cart
    public function index(Request $request)
    {
        $this->initializeCart($request);

        $products = Product::notInCart($request);
        if ($request->expectsJson()) {
            return response()->json($products);
        }
        return view('index');//for non-ajax requests, redirect to main page
    }

    //see products in cart
    public function cart(Request $request)
    {
        $this->initializeCart($request);

        $productsInCart = $request->session()->get('productsInCart', []);
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
            $product = Product::findOrFail($id);//check if id is a valid product

            $this->initializeCart($request);
            $productsInCart = collect($request->session()->get('productsInCart', []));

            if (!$productsInCart->contains($id)) {
                $productsInCart->push($id);
                $request->session()->put('productsInCart', $productsInCart->all());
            }
            if ($request->expectsJson()) {
                return response()->json(['success' => 'Product added']);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'The selected product does not exist'], 404);
            }
        }
        return view('index');
    }

    //remove from cart
    public function clearCart(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $this->initializeCart($request);
            $productsInCart = $request->session()->get('productsInCart', []);

            if (($key = array_search($id, $productsInCart)) !== false) {
                unset($productsInCart[$key]);
                $request->session()->put('productsInCart', $productsInCart);
            }
            if ($request->expectsJson()) {
                return response()->json(['success' => 'Product removed']);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'The selected product does not exist'], 404);
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

        $productsInCart = $request->session()->get('productsInCart', []);
        $products = Product::whereIn('id', $productsInCart)->get();
        $totalPrice = $products->sum('price');

        Mail::to(env('USER_EMAIL'))->queue(new OrderConfirmation($products, $request->all()));

        $order = Order::create([
            'customer_name' => $request->name,
            'contact_details' => $request->details,
            'comments' => $request->comments,
            'total_price' => $totalPrice
        ]);

        if ($products->isNotEmpty()) {
            $order->products()->attach($products->pluck('id')->toArray());
        }

        $request->session()->forget('productsInCart');

        if ($request->expectsJson()) {
            return response()->json(['success' => 'Order placed']);
        }
        return view('index');
    }
}
