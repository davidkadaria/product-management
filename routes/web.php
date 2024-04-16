<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::get('/', [ProductController::class, 'index'])->name('home');
Route::delete('/', [ProductController::class, 'index'])->name('home');
Route::get('/products/{id}', [ProductController::class, 'productDetail'])->name('product.detail');
Route::delete('/products/{id}', [ProductController::class, 'deleteProduct'])->name('product.delete');
Route::get('/dashboard', [ProductController::class, 'dashboard'])->name('dashboard');