<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    public $incrementing = false;

    protected $hidden = ['password', 'api_token'];
    protected $keyType = 'string';
    protected $primaryKey = 'username';
    protected $table = 'pelanggan';

    public function transaksi()
    {
        return $this->hasMany('App\Transaksi', 'username_pelanggan', 'username');
    }

    public function getAuthIdentifierName()
    {
        return 'username';
    }

    public function getAuthIdentifier()
    {
        return $this->username;
    }
}
