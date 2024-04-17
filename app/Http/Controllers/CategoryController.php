<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'category_name' => 'required',
        ]);

        $category = Category::create([
            'name' => $request->input('category_name'),
        ]);

        return redirect()->back()->with('success', 'Category created successfully');
    }

}
