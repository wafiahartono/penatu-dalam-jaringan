<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransaksiTable extends Migration
{
    public function up()
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->timestamps();
            $table->bigIncrements('id');
            $table->string('username_pelanggan');
            $table->dateTime('tanggal_masuk')->nullable()->default(null);
            $table->dateTime('tanggal_jadi')->nullable()->default(null);
            $table->boolean('antar');
            $table->boolean('ekspres');
            $table->unsignedMediumInteger('total_biaya');
            $table->dateTime('tanggal_selesai')->nullable()->default(null);

            $table->foreign('username_pelanggan')->references('username')->on('pelanggan')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::dropIfExists('transaksi');
    }
}
