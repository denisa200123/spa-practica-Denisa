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

            return view('index');
        } catch (\Exception $e) {
            return back()->withErrors('no orders');
        }
    }

    public function show(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $orderProducts = $order->products;
            if ($request->expectsJson()) {
                return response()->json($orderProducts);
            }

            return view('index');
        } catch (\Exception $e) {
            return back()->withErrors(__('Did not find order'));
        }
    }
}
