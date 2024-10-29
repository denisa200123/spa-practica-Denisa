<h1>{{ __('Order Confirmation') }}</h1>

<p>{{ __('Here are the details of the order:') }}</p>

<table border="1" cellpadding="10">
    <tr>
        <x-display-product-details />
    </tr>

    @foreach ($products as $product)
        <tr>
            <td>{{ $product->title }}</td>
            <td>{{ $product->price }}</td>
            <td>{{ $product->description }}</td>
            <td><img src="{{ $message->embed(public_path('images/' . $product->image_path)) }}" alt="{{ $product->title }}" style="width: 150px; height: auto;"/></td>
        </tr>
    @endforeach
</table>

<h2>{{ __('Customer name:') }} {{ $customerDetails['name'] }}</h2>
<h2>{{ __('Details:') }} {{ $customerDetails['details'] }}</h2>
<h2>{{ __('Comments:') }} {{ $customerDetails['comments'] }}</h2>
