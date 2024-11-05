<x-layout>
    <x-header />

    <div class="page index" style="margin: 10px;">
        <h2>{{ __('What you can buy:') }}</h2>
        <table class="list" border="1" cellpadding="10"></table>
    </div>

    <div class="page cart" style="margin: 10px;">
        <h2>{{ __('Your cart') }}</h2>
        <div style="display: flex; gap: 100px;">
            <table class="list" border="1" cellpadding="10" style="width: fit-content; height: fit-content;"></table>
            <form class="checkoutForm" style="display: flex; flex-direction: column;"></form>
        </div>
    </div>

    <div class="page login" style="margin: 50px;">
        <h2>{{ __('Login info') }}</h2>
        <form class="loginForm" style="display: flex; flex-direction: column; width: fit-content; height: fit-content;"></form>
    </div>

    <div class="page products" style="margin: 10px;">
        <h2>{{ __('All the products:') }}</h2>
        <table class="list" border="1" cellpadding="10"></table>
    </div>

    <div class="page edit" style="margin: 10px;">
        <h2>{{ __('Edit product') }}</h2>
        <form class="editProductForm" style="display: flex; flex-direction: column; width: fit-content; height: fit-content;"></form>
    </div>

    <div class="page create" style="margin: 10px;">
        <h2>{{ __('Create product') }}</h2>
        <form class="createProductForm" style="display: flex; flex-direction: column; width: fit-content; height: fit-content;"></form>
    </div>

    <div class="page orders" style="margin: 10px;">
        <h2>{{ __('Orders') }}</h2>
        <table class="list" border="1" cellpadding="10"></table>
    </div>

    <div class="page order" style="margin: 10px;">
        <h2>{{ __('Order') }}</h2>
        <table class="list" border="1" cellpadding="10"></table>
    </div>
</x-layout>
