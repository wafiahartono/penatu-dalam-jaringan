<?php

Route::middleware('guest')->group(function () {
    Route::post('/otentikasi/pelanggan/masuk', function () {
        $pelanggan = App\Pelanggan::find(request('username'), ['username', 'password']);
        if ($pelanggan) {
            if (Illuminate\Support\Facades\Hash::check(request('password'), $pelanggan->password)) {
                $token = Illuminate\Support\Str::random(60);
                $pelanggan->api_token = hash('sha256', $token);
                $pelanggan->save();
                return ['result' => true, 'token' => $token];
            }
        }
        return ['result' => false];
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/otentikasi/pelanggan/keluar', function () {
        DB::table('pelanggan')->where('username', auth('api')->id())->update(['api_token' => null]);
    });

    Route::get('/pelanggan/nama', function () {
        return App\Pelanggan::find(auth('api')->id(), ['nama']);
    });

    Route::get('/paket', function () {
        $data = App\Paket::select(['id', 'nama', 'keterangan', 'dry_clean', 'press'])
            ->when(request()->query('urutkan'), function ($query, $urutkan) {
                return $query->orderBy($urutkan, request()->query('urutan', 'asc'));
            })
            ->when(request()->query('cari'), function ($query, $cari) {
                return $query
                    ->where('id', 'like', '%' . $cari . '%')
                    ->orWhere('nama', 'like', '%' . $cari . '%')
                    ->orWhere('keterangan', 'like', '%' . $cari . '%');
            });
        if (request()->query('halaman')) return App\ResourceHelper::paginate($data, request()->query('item', 10));
        else return $data->get();
    });

    Route::get('/paket/{id}', function ($id) {
        $paket = App\Paket::find($id, ['id', 'nama', 'keterangan', 'dry_clean', 'press']);
        return $paket ? ['result' => true, 'paket' => $paket] : ['result' => false];
    });

    Route::post('/transaksi', function () {
        $total_biaya = 0;
        foreach (request('detail') as $detail) {
            $total_biaya += App\Paket::find($detail['paket'], [$detail['jenis'] ? 'dry_clean' : 'press'])[$detail['jenis'] ? 'dry_clean' : 'press'] * $detail['jumlah'];
        }
        $total_biaya = $total_biaya * (request('ekspres') ? 2 : 1);

        if ($total_biaya === request('total_biaya') ? request('total_biaya') : request('totalBiaya')) {
            $transaksi = new App\Transaksi;
            $transaksi->username_pelanggan = auth('api')->id();
            $transaksi->antar = request('antar') ? 1 : 0;
            $transaksi->ekspres = request('ekspres') ? 1 : 0;
            $transaksi->total_biaya = $total_biaya;
            $transaksi->save();
            foreach (request('detail') as $detail) {
                $detail_transaksi = new App\DetailTransaksi;
                $detail_transaksi->id_transaksi = $transaksi->id;
                $detail_transaksi->id_paket = $detail['paket'];
                $detail_transaksi->jumlah = $detail['jumlah'];
                $detail_transaksi->jenis = $detail['jenis'];
                $detail_transaksi->biaya = App\Paket::find($detail['paket'], [$detail['jenis'] ? 'dry_clean' : 'press'])[$detail['jenis'] ? 'dry_clean' : 'press'] * $detail['jumlah'];
                $detail_transaksi->save();
            }
            return ['result' => true];
        } else return ['result' => false];
    });

    Route::get('/transaksi', function () {
        return App\Pelanggan::find(auth('api')->id(), ['username'])->transaksi()->select(['id', 'created_at', 'tanggal_masuk', 'tanggal_jadi', 'antar', 'ekspres', 'total_biaya', 'tanggal_selesai'])->get();
    });
});

Route::get('/otentikasi/pelanggan/token', function () {
    return ['result' => auth('api')->check()];
});

Route::get('/otentikasi/unauthenticated', function () {
    return 'Unauthenticated';
})->name('api/unauthenticated');

Route::get('/transaksi/{id}', function ($id) {
    $transaksi = App\Transaksi::where('username_pelanggan', auth()->id())->where('id', $id)->first(['id', 'created_at', 'tanggal_masuk', 'tanggal_jadi', 'antar', 'ekspres', 'total_biaya', 'tanggal_selesai']);
    $transaksi->detail_transaksi = $transaksi->detailTransaksi()->get(['id_paket', 'jumlah', 'jenis', 'biaya']);
    foreach ($transaksi->detail_transaksi as $detail_transaksi) {
        $detail_transaksi->paket = $detail_transaksi->paket()->first(['nama', 'keterangan']);
    }
    return $transaksi;
    foreach ($transaksi->detail as $detail) {
        $detail->paket = $detail->paket()->first(['nama', 'keterangan', $detail->jenis ? 'dry_clean' : 'press']);
    }
    return $transaksi;
});
