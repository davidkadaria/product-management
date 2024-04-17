<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

class ProductFactory extends Factory
{
    protected $model = Product::class;
    protected $dummyImages = [
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/35302887-bf5b-4c46-a9e0-fc72c65ffb50/d2zaii3-22e60a2b-a164-44bd-a487-cb16589a4799.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM1MzAyODg3LWJmNWItNGM0Ni1hOWUwLWZjNzJjNjVmZmI1MFwvZDJ6YWlpMy0yMmU2MGEyYi1hMTY0LTQ0YmQtYTQ4Ny1jYjE2NTg5YTQ3OTkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hm2OTe9W756fttOuga2kQ5lWBIWQcTyfHkS8qvTygyQ',
        'https://wallpapercave.com/wp/wp5609388.jpg',
        'https://live.staticflickr.com/65535/49389103952_ff4b2cf256.jpg',
        'https://farm5.staticflickr.com/4466/36906009863_625ce02e9f.jpg',
        'https://farm6.staticflickr.com/5112/6970631088_f8a396cc6a.jpg',
        'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg'
    ];

    public function definition()
    {
        $numImages = rand(1, count($this->dummyImages));
        $selectedImages = $this->faker->randomElements($this->dummyImages, $numImages);

        return [
            'name' => $this->faker->name,
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 0, 1000),
            'images' => json_encode($selectedImages),
        ];
    }
}