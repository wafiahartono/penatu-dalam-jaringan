<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    public $incrementing = false;

    protected $keyType = 'char';
    protected $table = 'paket';
}
