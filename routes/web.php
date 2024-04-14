<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/dashboard', [ProductController::class, 'dashboard'])->name('dashboard');