<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        @vite('resources/js/routes.js')
        @vite('resources/js/common.js')
        @vite('resources/js/index.js')
        @vite('resources/js/cart.js')
        @vite('resources/js/login.js')
        @vite('resources/js/products.js')
        @vite('resources/js/products-edit.js')
        @vite('resources/js/products-create.js')
        @vite('resources/js/orders.js')

        <style>
            img {
                width: 150px;
                height: auto;
            }

            table {
                width: 1000px;
                height: fit-content;
            }

            form {
                display: flex;
                flex-direction: column;
                width: fit-content;
                height: fit-content;
            }
        </style>
    </head>

    <body>
        {{ $slot }}
    </body>
</html>
