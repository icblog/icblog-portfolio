<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->integer('created_by', false);
            $table->integer('updated_by', false);
            $table->string('title', 255);
            $table->string('slug', 255);
            $table->text('body');
            $table->integer('views', false)->default(0);
            $table->string('status', 255)->default('saved');
            $table->string('has_images', 255)->default('no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
