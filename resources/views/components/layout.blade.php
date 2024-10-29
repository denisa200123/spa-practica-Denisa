<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        @vite('resources/js/index.js')
        @vite('resources/js/routes.js')
        <style>
            img {
                width: 150px;
                height: auto;
            }

            table {
                width: 1000px;
            }
        </style>
    </head>

    <body>
        {{ $slot }}
    </body>
</html>
