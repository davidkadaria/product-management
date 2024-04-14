<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

class ProductFactory extends Factory
{
    protected $model = Product::class;
    protected $dummyImages = [
        'https://wallpapercave.com/wp/wp10424505.png',
        'https://img.goodfon.com/original/1024x768/3/44/naruto-naruto-saske-uchiha.jpg',
        'https://images.wallpapersden.com/image/download/jiraiya-naruto_a2pobG6UmZqaraWkpJRmZWdprWxrbQ.jpg',
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