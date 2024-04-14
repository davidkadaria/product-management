<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::resource('/', ProductController::class);