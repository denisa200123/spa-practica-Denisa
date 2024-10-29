@props(['active' => false])

<a {{ $active ? 'style=color:red;' : '' }} class="btn btn-dark" {{ $attributes }}>{{ $slot }}</a>
