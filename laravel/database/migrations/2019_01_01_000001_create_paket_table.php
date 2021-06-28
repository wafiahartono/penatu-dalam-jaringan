<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaketTable extends Migration
{
    public function up()
    {
        Schema::create('paket', function (Blueprint $table) {
            $table->timestamps();
            $table->char('id', 10)->primary();
            $table->string('nama');
            $table->string('keterangan');
            $table->unsignedMediumInteger('dry_clean');
            $table->unsignedMediumInteger('press');
        });
    }

    public function down()
    {
        Schema::dropIfExists('paket');
    }
}
