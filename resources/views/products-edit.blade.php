<x-layout>

    <x-slot name="title"> {{ __('Edit product') }}</x-slot>

    <x-header />

    <x-validation-messages />

    @if ($product)

        <div style="margin-left: 10px; margin-bottom: 10px;">
            <h2>{{ __('Edit product') }}</h2>
            <table border="1" cellpadding="10">
                <tr>
                    <x-display-product-details />
                    <th>{{ __('Edit') }}</th>
                </tr>
                <tr>
                    <form action="{{ route('products.update', $product->id) }}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('PATCH')
                        <td> <input type="text" id="title" name="title" value="{{ $product->title }}"> </td>
                        <td> <input type="number" name="price" id="price" step="0.01" min="0" value="{{ $product->price }}"> </td>
                        <td> <input type="text" id="description" name="description" value="{{ $product->description }}"> </td>
                        <td> <input type="file" name="image" id="image"> </td>

                        <td><input type="submit" value="{{ __('Edit') }}" class="btn btn-warning"></td>
                    </form>
                </tr>
            </table>
        </div>

    @else
        <h3>{{ __('No products to edit') }}</h3>
    @endif

</x-layout>
