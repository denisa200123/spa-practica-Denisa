<x-layout>

    <x-slot name="title">{{ __('Products found') }}</x-slot>

    <x-header />

    <x-validation-messages />

    @if (count($products) > 0)
        <div style="margin-left: 10px; margin-bottom: 10px;">
            <h2>{{ __('Products found') }}</h2>
            <table border="1" cellpadding="10" style="margin-top: 10px;">
                <tr>
                    <x-display-product-details />
                </tr>

                @foreach ($products as $product)
                    <tr>
                        <x-display-product :product="$product" />
                    </tr>
                @endforeach
            </table>
        </div>
    @else
        <h2 style="margin-left: 10px;">{{ __('Product not found') }}</h2>
    @endif
</x-layout>
