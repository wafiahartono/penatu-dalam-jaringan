<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailTransaksiTable extends Migration
{
    public function up()
    {
        Schema::create('detail_transaksi', function (Blueprint $table) {
            $table->timestamps();
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_transaksi');
            $table->char('id_paket', 10);
            $table->unsignedTinyInteger('jumlah');
            $table->boolean('jenis');
            $table->unsignedMediumInteger('biaya');

            $table->foreign('id_transaksi')->references('id')->on('transaksi')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign('id_paket')->references('id')->on('paket')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::dropIfExists('detail_transaksi');
    }
}
