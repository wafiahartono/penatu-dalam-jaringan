<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker\Factory::create('id_ID');

        for ($i = 0; $i < 3; $i++) {
            $pelanggan = new App\Pelanggan;
            $pelanggan->username = $faker->userName;
            $pelanggan->password = Illuminate\Support\Facades\Hash::make('password');
            $pelanggan->nama = $faker->name;
            $pelanggan->alamat = $faker->streetAddress;
            $pelanggan->telepon = '081' . $faker->randomNumber(9);
            $pelanggan->save();
        }

        DB::unprepared(file_get_contents('database/seeds/paket.sql'));

        for ($i = 0; $i < 15; $i++) {
            $transaksi = new App\Transaksi;
            $transaksi->username_pelanggan = App\Pelanggan::select('username')->inRandomOrder()->first()->username;
            $transaksi->tanggal_masuk = $faker->boolean() ? date_create() : null;
            $transaksi->tanggal_jadi = $transaksi->tanggal_masuk ? $faker->dateTimeBetween('now +1 day', 'now +4 days') : null;
            $transaksi->antar = $faker->boolean() ? 1 : 0;
            $transaksi->ekspres = $faker->boolean() ? 1 : 0;
            $transaksi->tanggal_selesai = $transaksi->tanggal_masuk ? $faker->boolean() ? $faker->dateTimeBetween('now +5 days', 'now +6 days') : null : null;
            $transaksi->total_biaya = 0;
            $transaksi->save();

            $total_biaya = 0;
            for ($j = 0; $j < $faker->numberBetween(1, 5); $j++) {
                $paket = App\Paket::select('id', 'dry_clean', 'press')->inRandomOrder()->first();
                $detail_transaksi = new App\DetailTransaksi;
                $detail_transaksi->id_transaksi = $transaksi->id;
                $detail_transaksi->id_paket = $paket->id;
                $detail_transaksi->jumlah = $faker->numberBetween(1, 5);
                $detail_transaksi->jenis = $paket->press ? ($faker->boolean() ? 1 : 0) : 1;
                $detail_transaksi->biaya = $detail_transaksi->jumlah * ($detail_transaksi->jenis ? $paket->dry_clean : $paket->press);
                $detail_transaksi->save();
                $total_biaya += $detail_transaksi->biaya;
            }

            $transaksi->total_biaya = $total_biaya * ($transaksi->ekspres ? 2 : 1);
            $transaksi->save();
        }
    }
}
