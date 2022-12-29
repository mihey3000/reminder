<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Напоминалка</title>

    @vite(['resources/scss/app.scss'])
</head>

<body class="antialiased">
    <div id="app"></div>

    @vite(['resources/js/app.js'])
</body>

</html>
