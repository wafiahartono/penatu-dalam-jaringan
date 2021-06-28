<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    public function detailTransaksi()
    {
        return $this->hasMany('App\DetailTransaksi', 'id_transaksi', 'id');
    }

    public function pelanggan()
    {
        return $this->belongsTo('App\Pelanggan', 'username_pelanggan');
    }

    protected $table = 'transaksi';
}
