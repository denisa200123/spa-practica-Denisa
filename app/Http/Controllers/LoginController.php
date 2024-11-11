<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function loginForm(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json();
        }
        return view('index');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'password' => 'required|string',
        ]);

        if ($request->username === env('ADMIN_USERNAME') && $request->password === env('ADMIN_PASSWORD')) {
            $request->session()->put('is_admin', true);

            if ($request->expectsJson()) {
                return response()->json(['success' => __('Successfull login!')]);
            }
        }

        if ($request->expectsJson()) {
            return response()->json(['error' => __('Invalid credentials!')], 401);
        }

        return view('index');
    }

    public function destroy(Request $request)
    {
        $request->session()->forget('is_admin');

        if ($request->expectsJson()) {
            return response()->json(['success' => __('Successfull logout!')]);
        }

        return view('index');
    }

    public function header()
    {
        return view('components/header')->render();
    }
}
