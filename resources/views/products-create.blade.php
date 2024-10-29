<x-layout>

    <x-slot name="title">{{ __('Create product') }}</x-slot>

    <x-header />

    <x-validation-messages />

    <div style="margin-left: 10px; margin-bottom: 10px;">
        <h2>{{ __('Create product') }}</h2>
        <table border="1" cellpadding="10">
            <tr>
                <x-display-product-details />
                <th>{{ __('Create product') }}</th>
            </tr>
            <tr>
                <form action="{{ route('products.store') }}" method="post" enctype="multipart/form-data">
                    @csrf

                    <td> <input type="text" id="title" name="title"> </td>
                    <td> <input type="number" name="price" id="price" step="0.01" min="0"> </td>
                    <td> <input type="text" id="description" name="description"></td>
                    <td> <input type="file" name="image" id="image"> </td>

                    <td><input type="submit" value="{{ __('Create') }}" class="btn btn-primary"></td>
                </form>
            </tr>
        </table>
    </div>

</x-layout>
