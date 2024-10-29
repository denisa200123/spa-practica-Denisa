<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'password' => 'required|string',
        ]);

        if ($request->username === env('ADMIN_USERNAME') && $request->password === env('ADMIN_PASSWORD')) {
            $request->session()->put('is_admin', true);
            return redirect()->route('home')->with('success', __('Login successfull!'));
        }

        return back()->withErrors(__('Invalid credentials!'));
    }

    public function destroy(Request $request)
    {
        $request->session()->forget('is_admin');
        return redirect()->route('home');
    }
}
