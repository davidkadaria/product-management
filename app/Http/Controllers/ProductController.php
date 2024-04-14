<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $paginationDefaults = ['per_page' => 10, 'page' => 1];

        $perPage = $request->input('per_page', $paginationDefaults['per_page']);
        $page = $request->input('page', $paginationDefaults['page']);

        $products = Product::with('categories')->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('Home', [
            'products' => $products,
        ]);
    }
}
