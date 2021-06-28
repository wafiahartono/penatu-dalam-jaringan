<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    public function paket()
    {
        return $this->hasOne('App\Paket', 'id', 'id_paket');
    }

    protected $table = 'detail_transaksi';
}
