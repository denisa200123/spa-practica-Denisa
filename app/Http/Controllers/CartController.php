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
    public function home(Request $request)
    {
        $this->initializeCart($request);

        $products = Product::notInCart($request);
        return view('home',['products'=>$products]);
    }

    //see products in cart
    public function cart(Request $request)
    {
        $this->initializeCart($request);

        $productsInCart = $request->session()->get('productsInCart', []);
        $products = Product::whereIn('id', $productsInCart)->get();

        return view('cart', ['products' => $products]);
    }

    //add product to cart
    public function addCart(Request $request, $id)
    {
        try {
            $this->initializeCart($request);
            $productsInCart = collect($request->session()->get('productsInCart', []));

            if (!$productsInCart->contains($id)) {
                $productsInCart->push($id);
                $request->session()->put('productsInCart', $productsInCart->all());
            }
            return redirect()->route('home')->with('success', __('Product added to cart'));
        } catch (\Exception $e) {
            return back()->withErrors(__('The selected product does not exist'));
        }
    }

    //remove from cart
    public function clearCart(Request $request, $id)
    {
        try {
            $this->initializeCart($request);
            $productsInCart = $request->session()->get('productsInCart', []);

            if (($key = array_search($id, $productsInCart)) !== false) {
                unset($productsInCart[$key]);
                $request->session()->put('productsInCart', $productsInCart);
            }

            return redirect()->route('cart')->with('success', __('Product removed'));
        } catch (\Exception $e) {
            return back()->withErrors(__('The selected product does not exist'));
        }
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

        return redirect()->route('home')->with('success', __('Order placed successfully'));
    }
}
