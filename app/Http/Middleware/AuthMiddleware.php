<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next): Response|JsonResponse
    {
        if (Auth::check()) {
            return $next($request);
        }
         return response()->json([
            'message' => 'Login failed'
        ], 403);
    }
}
