<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Session;
use File;

class ProductController extends Controller
{
    //order products
    public function order(Request $request)
    {
        try {
            $request->validate(['orderBy' => 'string|max:20|min:1|in:title,price,description,none']);
            $orderBy = $request->orderBy;

            if ($orderBy) {
                Session::put('orderBy', $orderBy);
            }

            if (Session::get('orderBy') === 'none') {
                $products = Product::paginate(2);
            } else {
                $products = Product::orderBy(Session::get('orderBy'), 'asc')->paginate(2);
            }

            if ($products && count($products)>0 && $request->expectsJson()) {
                return response()->json($products);
            }
        } catch (\Throwable $th) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Invalid select'], 400);
            }
        }
        return view('index');
    }

    //search product
    public function search(Request $request, $name)
    {
        $products = Product::where('title', 'like', "%$name%")->get();
        if ($products && count($products) > 0 && $name && $request->expectsJson()) {
            return response()->json($products);
        } else if ($request->expectsJson()) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        return view('index');
    }

    //display all products
    public function index(Request $request)
    {
        Session::put('orderBy', 'none');

        $products = Product::paginate(2);
        if ($request->expectsJson()) {
            return response()->json($products);
        }

        return view('index');
    }

    //create product page
    public function create(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json();
        }

        return view('index');
    }

    //store product
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'image' => 'required|image',
        ]);
        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '.' . $extension;
        $file->move('images/', $filename);

        $info = ['title' => $request->title, 'price' => $request->price, 'description' => $request->description, 'image_path' => $filename];

        Product::create($info);

        if ($request->expectsJson()) {
            return response()->json(['success' => 'Product created']);
        }

        return view('index');
    }

    //edit product page
    public function edit(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            if ($request->expectsJson()) {
                return response()->json($product);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Did not find product'], 404);
            }
        }
        return view('index');
    }

    //update product
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'string|max:255',
            'price' => 'numeric|min:0',
            'description' => 'string',
            'image' => 'image',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('image')) {
            $destination = 'images/' . $product->image_path;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('images/', $filename);
            $product->image_path = $filename;
        }

        $product->update($request->all());

        if ($request->expectsJson()) {
            return response()->json(['success' => 'Product updated']);
        }

        return view('index');
    }

    //delete product
    public function destroy(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            if ($request->expectsJson()) {
                return response()->json(['success' => 'Product destroyed']);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Product couldnt be removed'], 400);
            }
        }
        return view('index');
    }

}
