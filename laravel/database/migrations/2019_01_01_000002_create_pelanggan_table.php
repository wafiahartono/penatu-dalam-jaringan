<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePelangganTable extends Migration
{
    public function up()
    {
        Schema::create('pelanggan', function (Blueprint $table) {
            $table->timestamps();
            $table->string('username')->primary();
            $table->string('password');
            $table->string('api_token', 80)->unique()->nullable()->default(null);
            $table->string('nama');
            $table->string('alamat');
            $table->string('telepon');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pelanggan');
    }
}
