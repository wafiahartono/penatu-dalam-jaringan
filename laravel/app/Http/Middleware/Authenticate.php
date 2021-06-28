<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            if (\Illuminate\Support\Str::contains($request->path(), 'api')) return route('api/unauthenticated');
            else return route('admin/masuk');
        }
    }
}
