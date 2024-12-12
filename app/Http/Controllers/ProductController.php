<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Session;
use File;

class ProductController extends Controller
{
    private function saveImage($file)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '.' . $extension;
        $file->move('images/', $filename);

        return $filename;
    }

    //display all products
    public function index(Request $request)
    {
        $request->validate([
            'orderBy' => 'string|in:title,price,description,none',
            'searchedProduct' => 'nullable|string|max:255'
        ]);

        $orderBy = $request->input('orderBy');
        $searchedProduct = $request->input('searchedProduct');
        $query = Product::query();

        if (!empty($searchedProduct)) {
            $query->where('title', 'like', "%{$searchedProduct}%");
        }

        if ($orderBy !== 'none' && !empty($orderBy)) {
            $query->orderBy($orderBy, 'asc');
        }

        $products = $query->paginate(2)->appends([
            'searchedProduct' => $searchedProduct,
            'orderBy' => $orderBy
        ]);

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
            'image' => 'required|image',
        ]);

        $filename = $this->saveImage($request->file('image'));

        $info = [
            'title' => $request->title,
            'price' => $request->price,
            'description' => $request->description,
            'image_path' => $filename
        ];

        Product::create($info);

        if ($request->expectsJson()) {
            return response()->json(['success' => __('Product created')]);
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
                return response()->json(['error' => __('Did not find product')], 404);
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
            'image' => 'image',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('image')) {
            $destination = 'images/' . $product->image_path;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $filename = $this->saveImage($request->file('image'));
            $product->image_path = $filename;
        }

        $product->update($request->all());

        if ($request->expectsJson()) {
            return response()->json(['success' => __('Product updated')]);
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
                return response()->json(['success' => __('Product removed')]);
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => __('Product couldnt be removed')], 400);
            }
        }
        return view('index');
    }
}
