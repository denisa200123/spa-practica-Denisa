<?php

namespace App\Http\Controllers;

use App\Models\Order;

class OrderController extends Controller
{
    public function show($id)
    {
        try {
            $order = Order::findOrFail($id);
            return view('orders-show', ['order' => $order]);
        } catch (\Exception $e) {
            return back()->withErrors(__('Did not find order'));
        }
    }
}
