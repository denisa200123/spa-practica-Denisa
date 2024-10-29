<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        //admin can't access login
        if (session(key: 'is_admin') && $request->route()->named('login.form')) {
            return redirect('/');
        }

        //login form can be accessed only if admin is not already logged in
        if (!session('is_admin') && $request->route()->named('login.form')) {
            return $next($request);
        }

        //only admin can access admin restricted pages
        if (session('is_admin')) {
            return $next($request);
        }

        //if the user is not logged in => redirect to main page
        return redirect('/');
    }
}
