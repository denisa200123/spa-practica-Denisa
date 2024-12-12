<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Session;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        //admin can't access login & only admin can access admin restricted pages
        if (Session::get('is_admin') && $request->route()->named('login.form') || !Session::get('is_admin') && !$request->route()->named('login.form')) {
            abort(403, __('Unauthorized'));
        }

        return $next($request);
    }
}
