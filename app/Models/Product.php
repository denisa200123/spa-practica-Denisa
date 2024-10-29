<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Product extends Model
{
    use HasFactory;

    static function notInCart(Request $request)
    {
        $productsInCart = $request->session()->get('productsInCart', []);
        
        return static::whereNotIn('id', $productsInCart)->paginate(3);
    }
    
    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    protected $fillable = [
        'title',
        'description',
        'price',
        'image_path',
    ];
}
