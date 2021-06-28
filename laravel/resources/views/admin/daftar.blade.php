<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laundry Oasis Console - Daftar</title>
    <style>
        body {
            margin: 0 auto;
            width: 40vw;
        }

        form {
            border: 1px solid;
            box-sizing: border-box;
            margin: 0 auto 16px;
            padding: 8px;
            width: 100%;
        }

        form input {
            box-sizing: border-box;
            margin-bottom: 4px;
            width: 100%;
        }
    </style>
</head>

<body>
    <h1>Laundry Oasis Console - Daftar</h1>
    <form action="{{ url('otentikasi/admin/daftar') }}" method="post">
        <label for="username">Username</label><br>
        <input autocomplete="username" id="username" name="username" type="text"><br>
        <label for="username">Password</label><br>
        <input autocomplete="new-password" id="password" name="password" type="password"><br>
        <label for="username">Proteksi</label><br>
        <input autocomplete="current-password" id="proteksi" name="proteksi" type="password"><br>
        <input type="submit" value="Daftar">
        @csrf
    </form>
    <p style="text-align: center">Masuk <a href="{{ route('admin/masuk') }}">di sini</a></p>
</body>

</html>