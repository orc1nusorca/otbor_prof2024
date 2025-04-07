<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/files', [FileController::class, 'upload']);
    Route::put('/files/{file}', [FileController::class, 'update']);
    Route::delete('/files/{file}', [FileController::class, 'destroy']);
    Route::get('/files/{file}', [FileController::class, 'getFile']);
    Route::post('/files/{file}/share', [FileController::class, 'share']);
});
