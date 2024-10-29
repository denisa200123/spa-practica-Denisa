<x-layout>
    <x-slot name="title">{{ __('Login') }}</x-slot>

    <x-header />

    <x-validation-messages />

    <h2 style="margin-left: 20px;">{{ __('Login info') }}</h2>
    <form action="{{ route('login') }}" method="post">
        @csrf
        <div style="display: flex; flex-direction: column; width: fit-content; height: fit-content; margin-left: 20px;">
            <label for="username">{{ __('Username:') }}</label>
            <input type="text" id="username" name="username" required value="{{ old('username') }}">

            <label for="password">{{ __('Password:') }}</label>
            <input type="password" id="password" name="password" required value="{{ old('password') }}">

            <br>

            <button type="submit" class="btn btn-primary">{{ __('Login') }}</button>
        </div>
    </form>

</x-layout>
