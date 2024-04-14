<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfRecords = 100000;
        Product::factory()->count($numberOfRecords)->create()->each(function ($product) {
            $allCategories = Category::all();
            $categoryIds = $allCategories->random(rand(1, 3))->pluck('id')->toArray();

            $product->categories()->attach($categoryIds);
        });
        ;
    }
}
