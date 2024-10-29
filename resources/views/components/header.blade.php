<br>
<div style="display: flex; justify-content:space-between; align-items:center;">
    <div style="width: fit-content; height: fit-content; margin-left: 10px;">
        <x-header-anchor href="{{ route('home') }}" :active="request()->is('/')">
            {{ __('Store') }}
        </x-header-anchor>
        <x-header-anchor href="{{ route('cart') }}" :active="request()->is('cart')">
            {{ __('Your cart') }}
        </x-header-anchor>
    </div>

    @if (session("is_admin"))
        <div style="width: fit-content; height: fit-content;">
            <x-header-anchor href="{{ route('products.index') }}" :active="request()->is('products')">
                {{ __('Products') }}
            </x-header-anchor>
            <x-header-anchor href="{{ route('products.create') }}" :active="request()->is('products/create')">
                {{ __('Create product') }}
            </x-header-anchor>
            <x-header-anchor href="{{ route('orders.index') }}" :active="request()->is('orders')">
                {{ __('See orders') }}
            </x-header-anchor>
        </div>

        <x-header-anchor href="{{ route('login.destroy') }}" style="margin-right: 10px;">
            {{ __('Logout') }}
        </x-header-anchor>
    @else
        <div style="width: fit-content; height: fit-content; margin-right: 10px;">
            <x-header-anchor href="{{ route('login.form') }}" :active="request()->is('login')">
                {{ __('Admin login') }}
            </x-header-anchor>
        </div>
    @endif
</div>

<form id="langform" action="{{ route('set.language') }}" method="post" style="width: fit-content; height: fit-content; margin-top:10px; margin-left: 10px;">
    @csrf
    <select name="lang" id="lang" onchange="this.form.submit()">
        <option value="en" @if (session('locale', 'en') == 'en') selected @endif>English</option>
        <option value="ro" @if (session('locale') == 'ro') selected @endif>Romanian</option>
    </select>
</form>

<br><hr>
