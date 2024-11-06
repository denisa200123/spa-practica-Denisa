<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Session;

class ProductController extends Controller
{
    //order products
    public function order(Request $request)
    {
        $request->validate(['orderBy' => 'string|max:20|min:1|in:title,price,description,none']);
        $orderBy = $request->orderBy;

        if ($orderBy) {
            Session::put('orderBy', $orderBy);
        }

        if (Session::get('orderBy') === 'none') {
            $products = Product::paginate(3);
        } else {
            $products = Product::orderBy(Session::get('orderBy'), 'asc')->paginate(3);
        }

        if ($products && count($products)>0) {
            return view('products', ['products' => $products]);
        }
        return redirect()->route('products.index');
    }

    //search product
    public function search(Request $request)
    {
        $request->validate(['searchedProduct' => 'string|max:255|min:1']);
        $name = $request->searchedProduct;

        $products = Product::where('title', 'like', "%$name%")->get();
        if ($products && count($products) > 0 && $name) {
            return view('/products-search', ['products' => $products]);
        }
        return redirect()->route('products.index')->withErrors(__('Product not found'));
    }

    //display all products
    public function index(Request $request)
    {
        Session::put('orderBy', 'none');

        $products = Product::all();
        if ($request->expectsJson()) {
            return response()->json($products);
        }

        return view('index');
    }

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
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'description' => 'required|string',
                //'image' => 'required|image',
            ]);
            /*
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('images/', $filename);
            */
            $info = ['title' => $request->title, 'price' => $request->price, 'description' => $request->description];//, 'image_path' => $filename

            Product::create($info);

            if ($request->expectsJson()) {
                return response()->json(['success' => 'Product created']);
            }

            return view('index');
        } catch (\Exception $e) {
            return back()->withErrors(__('Product couldnt be created'));//to do
        }
    }

    //edit product page
    public function edit(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            if ($request->expectsJson()) {
                return response()->json($product);
            }
            return view('index');
        } catch (\Exception $e) {
            return back()->withErrors(__('Did not find product'));//to do
        }
    }

    //update product
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'title' => 'string|max:255',
                'price' => 'numeric|min:0',
                'description' => 'string',
                //'image' => 'image',
            ]);

            $product = Product::findOrFail($id);

            /*if ($request->hasFile('image')) {
                $destination = 'images/' . $product->image_path;
                if (File::exists($destination)) {
                    File::delete($destination);
                }
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('images/', $filename);
                $product->image_path = $filename;
            }*/

            $product->update($request->all());
            if ($request->expectsJson()) {
                return response()->json(['success' => 'Product updated']);
            }
            return view('index');
        } catch (\Exception $e) {
            return redirect()->route('index');//to do
        }
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
            return view('index');
        } catch (\Exception $e) {
            return back()->withErrors(__('Product couldnt be removed'));//to do
        }
    }

}
