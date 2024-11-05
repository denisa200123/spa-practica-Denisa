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
        if (session('is_admin') && $request->route()->named('login.form')) {
            return redirect('/');
        }

        //only admin can access admin restricted pages
        if (!session('is_admin')) {
            abort(403, 'unauthorized');
        }

        return $next($request);
    }
}
