<?php

Route::middleware('guest')->group(function () {
    Route::get('/otentikasi/admin/daftar', function () {
        return view('admin/daftar');
    })->name('admin/daftar');

    Route::post('/otentikasi/admin/daftar', function () {
        if (App\Admin::find(request('username'), ['username'])) {
            return 'Username telah terdaftar';
        } else if (Illuminate\Support\Facades\Hash::check(request('proteksi'), config('app.proteksi_admin'))) {
            $admin = new App\Admin;
            $admin->username = request('username');
            $admin->password = Illuminate\Support\Facades\Hash::make(request('password'));
            $admin->save();
            auth('admin')->login($admin);
            return redirect(route('admin/console'));
        } else {
            return 'Proteksi salah';
        }
    });

    Route::get('/otentikasi/admin/masuk', function () {
        return view('admin/masuk');
    })->name('admin/masuk');

    Route::post('/otentikasi/admin/masuk', function () {
        if (auth('admin')->attempt(request(['username', 'password']))) return redirect(route('admin/console'));
        else return 'Username atau password salah';
    });
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/otentikasi/admin/keluar', function () {
        auth('admin')->logout();
        return redirect(route('admin/masuk'));
    })->name('admin/keluar');

    Route::get('/', function () {
        return view('admin/console');
    })->name('admin/console');

    Route::post('/pelanggan', function () {
        if (App\Pelanggan::find(request('username'), ['username'])) {
            return ['result' => false];
        } else {
            $pelanggan = new App\Pelanggan;
            $pelanggan->username = request('username');
            $pelanggan->password = Illuminate\Support\Facades\Hash::make(request('password'));
            $pelanggan->nama = request('nama');
            $pelanggan->alamat = request('alamat');
            $pelanggan->telepon = request('telepon');
            $pelanggan->save();
            return ['result' => true];
        }
    });

    Route::get('/pelanggan', function () {
        $daftar_pelanggan = App\Pelanggan::select(['username', 'nama', 'alamat', 'telepon'])
            ->when(request()->query('urutkan'), function ($query, $urutkan) {
                return $query->orderBy($urutkan, request()->query('urutan', 'asc'));
            })
            ->when(request()->query('cari'), function ($query, $cari) {
                return $query
                    ->where('username', 'like', '%' . $cari . '%')
                    ->orWhere('nama', 'like', '%' . $cari . '%')
                    ->orWhere('telepon', 'like', '%' . $cari . '%');
            });
        if (request()->query('halaman')) return App\ResourceHelper::paginate($daftar_pelanggan, request()->query('item', 10));
        else return $daftar_pelanggan->get();
    });

    Route::get('/notifikasi/transaksi', function () {
        return ['result' => App\Transaksi::where('tanggal_masuk', null)->count('id')];
    });

    Route::get('/transaksi', function () {
        $daftar_transaksi = App\Transaksi::select(['id', 'username_pelanggan', 'created_at', 'tanggal_masuk', 'tanggal_jadi', 'antar', 'ekspres', 'total_biaya', 'tanggal_selesai'])
            ->when(request()->query('urutkan'), function ($query, $urutkan) {
                return $query->orderBy($urutkan, request()->query('urutan', 'asc'));
            })
            ->when(request()->query('cari'), function ($query, $cari) {
                return $query
                    ->where('id', 'like', '%' . $cari . '%')
                    ->orWhere('username_pelanggan', 'like', '%' . $cari . '%');
            });
        if (request()->query('halaman')) return App\ResourceHelper::paginate($daftar_transaksi, request()->query('item', 10));
        else return $daftar_transaksi->get();
    });

    Route::get('/transaksi/{id}', function ($id) {
        $transaksi = App\Transaksi::find($id, ['id', 'username_pelanggan', 'created_at', 'tanggal_masuk', 'tanggal_jadi', 'antar', 'ekspres', 'total_biaya', 'tanggal_selesai']);
        if ($transaksi) {
            $transaksi->detail_transaksi = $transaksi->detailTransaksi()->get(['id_paket', 'jumlah', 'jenis', 'biaya']);
            foreach ($transaksi->detail_transaksi as $detail_transaksi) {
                $detail_transaksi->paket = $detail_transaksi->paket()->first(['nama', 'keterangan', $detail_transaksi->jenis ? 'dry_clean' : 'press']);
            }
            $transaksi->pelanggan = $transaksi->pelanggan()->first(['nama', 'alamat', 'telepon']);
            return ['result' => true, 'transaksi' => $transaksi];
        } else return ['result' => false];
    });

    Route::post('/transaksi/{id}', function ($id) {
        $transaksi = App\Transaksi::find($id, ['id', 'tanggal_masuk', 'tanggal_jadi', 'tanggal_selesai']);
        if (request('tanggal_masuk') && request('tanggal_jadi')) {
            $transaksi->tanggal_masuk = \date_create_from_format('Y-m-d\TH:i', request('tanggal_masuk'))->format('Y-m-d H:i:s');
            $transaksi->tanggal_jadi = \date_create_from_format('Y-m-d\TH:i', request('tanggal_jadi'))->format('Y-m-d H:i:s');
        } else if (request('tanggal_selesai')) {
            $transaksi->tanggal_selesai = \date_create_from_format('Y-m-d\TH:i', request('tanggal_selesai'))->format('Y-m-d H:i:s');
        } else return ['result' => false];
        $transaksi->save();
        return ['result' => true];
    });

    Route::get('/migrate-and-seed', function () {
        if (Illuminate\Support\Facades\Hash::check(request()->query('proteksi'), config('app.proteksi_admin'))) Artisan::call('migrate:refresh --seed');
        else return 'Unauthenticated';
    });
});
