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
            <form class="checkout" style="display: flex; flex-direction: column;"></form>
        </div>
    </div>
</x-layout>
