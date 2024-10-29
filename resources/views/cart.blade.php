<x-layout>
    <x-slot name="title">{{ __('Your cart') }}</x-slot>

    <x-header />

    <x-validation-messages />

    @if (count($products) > 0)
    <div style="display: flex; padding: 40px 60px; gap: 100px;">
        <div style="margin-left: 50px; width: fit-content; height: fit-content;">
            <h2>{{ __('Your cart') }}</h2>
            <table border="1" cellpadding="10">
                <tr>
                    <x-display-product-details />
                    <th>{{ __('Remove product') }}</th>
                </tr>

                @foreach ($products as $product)
                    <tr>
                        <x-display-product :product="$product" />
                        <td>
                            <form action="{{ route('cart.clear', $product->id) }}" method="post">
                                @csrf
                                <input type="submit" value="{{ __('Remove') }}" class="btn btn-light"></input>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </table>
        </div>

        <div style="width: fit-content; height: fit-content;">
            <h2>{{ __('Checkout') }}</h2>
            <form action="{{ route('checkout') }}" method="post">
                @csrf
                <div style="display: flex; flex-direction: column;">
                    <label for="name">{{ __('Name') }}:</label>
                    <input type="text" id="name" name="name" required value="{{ old('name') }}">
                    <label for="details">{{ __('Order details:') }}</label>
                    <input type="text" id="details" name="details" required value="{{ old('details') }}">

                    <label for="comments">{{ __('Comments:') }}</label>
                    <textarea id="comments" name="comments" value="{{ old('comments') }}"></textarea>

                    <br>

                    <button type="submit" class="btn btn-primary">{{ __('Place Order') }}</button>
                </div>
            </form>
        </div>
    </div>

    @else
        <h2 style="margin-left: 10px;">{{ __('Your cart is empty') }}</h2>
    @endif

</x-layout>
