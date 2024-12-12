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
        Route::post('/cart/{product}/remove', 'removeCart')->name('cart.remove');
        Route::post('/cart/{product}/add', 'addCart')->name('cart.add');
        Route::post('/checkout', 'checkout')->name('checkout');
    });

    Route::middleware(['admin'])->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/products', 'index')->name('products.index');
            Route::post('/products', 'store')->name('products.store');
            Route::patch('/products/{product}', 'update')->name('products.update');
            Route::delete('/products/{product}', 'destroy')->name('products.destroy');
            Route::get('/products/show/{product?}', 'show')->name('products.show');
        });
    });

    Route::controller(LoginController::class)->group(function () {
        Route::get('/login', 'loginForm')->name('login.form')->middleware('admin');
        Route::post('/login', 'login')->name('login');
        Route::get('/header', 'header')->name('header');
        Route::get('/logout', 'logout')->name('logout')->middleware('admin');
    });

    Route::middleware(['admin'])->group(function () {
        Route::controller(OrderController::class)->group(function () {
            Route::get('/orders', 'index')->name('orders.index');
            Route::get('/orders/{order}', 'show')->name('orders.show');
        });
    });

    Route::post('/set-language', [LanguageController::class, 'setLanguage'])->name('set.language');
    Route::get('/translations', function () {
        $locale = session('locale');
        if ($locale === 'ro') {
            $translations = File::json(base_path('lang/ro.json'));
        } else {
            $translations = File::json(base_path('lang/en.json'));
        }

        return response()->json($translations);
    });
});
