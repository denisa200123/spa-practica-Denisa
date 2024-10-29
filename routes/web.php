<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\LanguageController;
use App\Models\Order;

Route::middleware(['setLocale'])->group(function () {

    Route::controller(CartController::class)->group(function () {
        Route::get('/', 'home')->name('home');
        Route::get('/cart', 'cart')->name('cart');
        Route::post('/cart/{product}/clear', 'clearCart')->name('cart.clear');
        Route::post('/cart/{product}/add', 'addCart')->name('cart.add');
        Route::post('/checkout', 'checkout')->name('checkout');
    });

    Route::middleware(['admin'])->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/products', 'index')->name('products.index');
            Route::view('/products/create', 'products-create')->name('products.create');
            Route::post('/products', 'store')->name('products.store');
            Route::get('/products/{product}/edit', 'edit')->name('products.edit');
            Route::patch('/products/{product}', 'update')->name('products.update');
            Route::delete('/products/{product}', 'destroy')->name('products.destroy');
            Route::get('/products/search', 'search')->name('products.search');
            Route::get('/products/order', 'order')->name('products.order');
        });
    });

    Route::controller(LoginController::class)->group(function () {
        Route::view('/login', 'login')->name('login.form')->middleware('admin');
        Route::post('/login', 'login')->name('login');
        Route::get('/logout', 'destroy')->name('login.destroy')->middleware('admin');
    });

    Route::view('/orders', 'orders', ['orders'=>Order::paginate(5)])->name('orders.index')->middleware('admin');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show')->middleware('admin');

    Route::post('/set-language', [LanguageController::class, 'setLanguage'])->name('set.language');
});
