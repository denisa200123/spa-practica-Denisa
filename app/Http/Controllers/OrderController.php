<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        try {
            $orders = Order::all();

            if ($request->expectsJson()) {
                return response()->json($orders);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => __('No orders to show')], 204);
            }
        }
        return view('index');
    }

    public function show(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $orderProducts = $order->products;

            if ($request->expectsJson()) {
                return response()->json($orderProducts);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => __('Did not find order')], 404);
            }
        }
        return view('index');
    }
}
