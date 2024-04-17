<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;


class ProductController extends Controller
{
    public function index(Request $request)
    {
        $paginationDefaults = ['per_page' => 10, 'page' => 1];

        $perPage = $request->input('per_page', $paginationDefaults['per_page']);
        $page = $request->input('page', $paginationDefaults['page']);

        $products = Product::with('categories')->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('Home', [
            'products' => $products,
        ]);
    }

    public function productDetail($id)
    {
        $product = Product::with('categories')->find($id);

        return Inertia::render('ProductDetail', [
            'product' => $product,
        ]);
    }

    public function createProduct(Request $request)
    {


        $request->validate([
            'product_name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'category' => 'required|array|min:1',
            'image' => 'required',
        ]);

        // Store images in storage/app/public/product-images
        $imagePaths = [];
        foreach ($request->file('image') as $image) {

            $path = $image->store('product-images', 'public');
            $imagePaths[] = 'storage/' . $path;
        }

        // Create the product
        $product = Product::create([
            'name' => $request->input('product_name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'images' => json_encode($imagePaths),
        ]);

        // Attach the categories
        // Get category ID from the request and attach it to the product
        $categoryIds = [];
        foreach ($request->input('category') as $categoryName) {
            $cat = Category::where('name', $categoryName)->first();
            if ($cat) {
                $categoryIds[] = $cat->id;
            }
        }

        $product->categories()->attach($categoryIds);

        return redirect()->back()->with('success', 'Product created successfully');
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        $product->delete();

        // return success message
        return redirect()->back()->with('success', 'Product deleted successfully');
    }

    public function dashboard()
    {
        $categories = Category::all();

        return Inertia::render('Dashboard', [
            'categories' => $categories,
        ]);
    }
}
