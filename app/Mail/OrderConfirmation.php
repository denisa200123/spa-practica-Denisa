<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Product;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $productsIds;
    public $customerDetails;

    public function __construct($productsIds, $customerDetails)
    {
        $this->productsIds = $productsIds;
        $this->customerDetails = $customerDetails;
    }

    public function build()
    {
        $products = Product::whereIn('id', $this->productsIds)->get();
        return $this->subject( __('Order Confirmation'))
                    ->view('components/order-confirmation')
                    ->with([
                        'products' => $products,
                        'customerDetails' => $this->customerDetails,
                    ]);
    }
}
