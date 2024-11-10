<header>
    <br>
    <div style="display: flex; justify-content:space-between; align-items:center;">
        <div style="width: fit-content; height: fit-content; margin-left: 10px;">
            <a href="#" class="btn btn-dark">{{ __('Home') }}</a>
            <a href="#cart" class="btn btn-dark">{{ __('Your cart') }}</a>
        </div>
        
        @if (session("is_admin"))
            <div style="width: fit-content; height: fit-content;">
                <div style="width: fit-content; height: fit-content;">
                    <a href="#products" class="btn btn-dark">Products</a>
                    <a href="#create" class="btn btn-dark" style="margin-left: 10px;">Create product</a>
                    <a href="#orders" class="btn btn-dark" style="margin-left: 10px;">See orders</a>
                </div>
            </div>

            <div style="width: fit-content; height: fit-content; margin-right: 10px;">
                <a href="#logout" class="btn btn-dark">{{ __('Logout') }}</a>
            </div>
        @else
            <div style="width: fit-content; height: fit-content; margin-right: 10px;">
                <a href="#login" class="btn btn-dark">{{ __('Admin login') }}</a>
            </div>
        @endif
    </div>

    <form id="languageForm" style="width: fit-content; height: fit-content; margin-top:10px; margin-left: 10px;">
        <select name="lang" id="lang">
            <option value="en" @if (session('locale', 'en') == 'en') selected @endif>{{ __('English') }}</option>
            <option value="ro" @if (session('locale') == 'ro') selected @endif>{{ __('Romanian') }}</option>
        </select>
        <button type="submit" class="btn btn-dark">Change language</button>
    </form>

    <br><hr>
</header>
