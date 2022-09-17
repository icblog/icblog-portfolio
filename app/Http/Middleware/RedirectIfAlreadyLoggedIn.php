<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class RedirectIfAlreadyLoggedIn
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
         if (Auth::check() && Auth::user()->role == 'a_admin') {
            return redirect()->route("admin.dashboard");
           }else if (Auth::check() && Auth::user()->role == 'subscriber') {
            return redirect()->route("blog.index");
           }else{
            return $next($request);
          }
    }
}
