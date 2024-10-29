<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $products;
    public $customerDetails;

    public function __construct($products, $customerDetails)
    {
        $this->products = $products;
        $this->customerDetails = $customerDetails;
    }

    public function build()
    {
        return $this->subject( __('Order Confirmation'))
                    ->view('components/order-confirmation')
                    ->with([
                        'products' => $this->products,
                        'customerDetails' => $this->customerDetails,
                    ]);
    }
}
