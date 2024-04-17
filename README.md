# Simple Product Management System

## Introduction

This repository contains a simple product management system built using Laravel and React. It allows users to manage products and categories.

## Installation

1. **Clone the repository:**

    ```
    git clone https://github.com/davidkadaria/product-management && cd product-management
    ```

2. **Install PHP dependencies:**

    ```
    composer install
    ```

3. **Install NPM packages:**

    ```
    npm install
    ```

4. **Configure .env file as you prefer. Just copy `.env.example` file contents to `.env` file and configure.**

5. **Run migrations:**

    ```
    php artisan migrate
    ```

6. **Seed the database:**

    ```
    php artisan db:seed
    ```

7. **Set Up storage link:**
    ```
    php artisan storage:link
    ```

## Usage

1. **Start the server:**

    ```
    php artisan serve
    ```

2. **Compile assets:**

    ```
    npm run dev
    ```

3. **Access the website:**
   Navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your web browser.
