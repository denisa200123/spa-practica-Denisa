<x-layout>

    <x-slot name="title">{{ __('Order information') }}</x-slot>

    <x-header />

    <x-validation-messages />

    @if ($order)

        <div style="margin-left: 10px; margin-bottom: 10px;">
            <h2>{{ __('Order information') }}</h2>
            <h4>ID: {{ $order->id }}</h4>
            <br>
            <h3>{{ __('Products ordered') }}</h3>
            <table border="1" cellpadding="10">
                <tr>
                    <x-display-product-details />
                </tr>
                @foreach ($order->products as $product)
                    <tr>
                        <x-display-product :product="$product" />
                    </tr>
                @endforeach
            </table>
        </div>

    @else
        <h3>{{ __('No order to show') }}</h3>
    @endif

</x-layout>
