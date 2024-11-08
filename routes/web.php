<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\LanguageController;

Route::middleware(['setLocale'])->group(function () {

    Route::controller(CartController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/cart', 'cart')->name('cart');
        Route::post('/cart/{product}/clear', 'clearCart')->name('cart.clear');
        Route::post('/cart/{product}/add', 'addCart')->name('cart.add');
        Route::post('/checkout', 'checkout')->name('checkout');
    });

    Route::middleware(['admin'])->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/products', 'index')->name('products.index');
            Route::get('/products/create', 'create')->name('products.create');
            Route::post('/products', 'store')->name('products.store');
            Route::get('/products/{product}/edit', 'edit')->name('products.edit');
            Route::patch('/products/{product}', 'update')->name('products.update');
            Route::delete('/products/{product}', 'destroy')->name('products.destroy');
            Route::get('/products/search/{product}', 'search')->name('products.search');
            Route::get('/products/order', 'order')->name('products.order');
        });
    });

    Route::controller(LoginController::class)->group(function () {
        Route::get('/login/form', 'loginForm')->name('login.form')->middleware('admin');
        Route::post('/login', 'login')->name('login');
        Route::get('/header', 'header')->name('header');
        Route::get('/logout', 'destroy')->name('login.destroy')->middleware('admin');
    });

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index')->middleware('admin');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show')->middleware('admin');

    Route::post('/set-language', [LanguageController::class, 'setLanguage'])->name('set.language');
});
