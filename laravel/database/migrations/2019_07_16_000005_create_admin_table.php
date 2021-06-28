<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminTable extends Migration
{
    public function up()
    {
        Schema::create('admin', function (Blueprint $table) {
            $table->timestamps();
            $table->string('username')->primary();
            $table->string('password');
            $table->rememberToken();
        });
    }

    public function down()
    {
        Schema::dropIfExists('admin');
    }
}
