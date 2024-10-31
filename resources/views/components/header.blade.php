<br>
<div style="display: flex; justify-content:space-between; align-items:center;">
    <div style="width: fit-content; height: fit-content; margin-left: 10px;">
        <a href="#" class="btn btn-dark">{{ __('Home') }}</a>
        <a href="#cart" class="btn btn-dark">{{ __('Your cart') }}</a>
    </div>

    @if (session("is_admin"))
        <div style="width: fit-content; height: fit-content;">
            <a href="#products" class="btn btn-dark">{{ __('Products') }}</a>
            <a href="#create-product" class="btn btn-dark">{{ __('Create product') }}</a>
            <a href="#orders" class="btn btn-dark">{{ __('See orders') }}</a>
        </div>

        <a href="#logout" style="margin-right: 10px;" class="btn btn-dark">{{ __('Logout') }}</a>
    @else
        <div style="width: fit-content; height: fit-content; margin-right: 10px;">
            <a href="#login" class="btn btn-dark">{{ __('Admin login') }}</a>
        </div>
    @endif
</div>

<form id="langform" action="{{ route('set.language') }}" method="post" style="width: fit-content; height: fit-content; margin-top:10px; margin-left: 10px;">
    @csrf
    <select name="lang" id="lang" onchange="this.form.submit()">
        <option value="en" @if (session('locale', 'en') == 'en') selected @endif>{{ __('English') }}</option>
        <option value="ro" @if (session('locale') == 'ro') selected @endif>{{ __('Romanian') }}</option>
    </select>
</form>

<br><hr>
