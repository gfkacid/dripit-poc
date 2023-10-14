<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('handle')->unique();
            $table->string('image');
            $table->string('cover');
            $table->text('bio');
            $table->string('spotify_id');
            $table->string('youtube_id')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->timestamps();

        });

        Schema::create('artist_extras', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('youtube_subs')->nullable();
            $table->unsignedBigInteger('spotify_monthly_listeners')->nullable();
            $table->unsignedBigInteger('insta_followers')->nullable();
            $table->dateTime('date');
            $table->unsignedBigInteger('artist_id');
            $table->foreign('artist_id')->references('id')->on('artists');
            $table->timestamps();
        });

        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('about');
            $table->string('image');
            $table->string('cover');
            $table->string('isrc');
            $table->string('spotify_id');
            $table->string('youtube_id');
            $table->string('sample_url');
            $table->unsignedBigInteger('artist_id');
            $table->foreign('artist_id')->references('id')->on('artists');
            $table->date('released_at');
            $table->timestamps();
        });

        Schema::create('drops', function (Blueprint $table) {
            $table->id();
            $table->string('contract')->unique();
            $table->string('slug')->unique();
            $table->unsignedInteger('price'); //in cents
            $table->unsignedInteger('royalties_share'); // 1 = 0.01% - 100 = 1% - 10000 = 100%
            $table->jsonb('extras');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->unsignedInteger('supply');
            $table->unsignedInteger('minted');
            $table->string('legal_url');
            $table->boolean('sold_out')->default(0);
            $table->boolean('published')->default(0);
            $table->unsignedBigInteger('track_id');
            $table->foreign('track_id')->references('id')->on('tracks');
            $table->timestamps();

        });

        Schema::create('nfts', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('token_id');
            $table->string('image');
            $table->dateTime('minted_at');
            $table->unsignedBigInteger('drop_id');
            $table->unsignedBigInteger('minted_by');
            $table->unsignedBigInteger('owner_id');
            $table->foreign('drop_id')->references('id')->on('drops');
            $table->foreign('minted_by')->references('id')->on('users');
            $table->foreign('owner_id')->references('id')->on('users');
            $table->timestamps();

        });

        Schema::create('royalties', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('amount'); //in cents
            $table->date('period_start');
            $table->date('period_end');
            $table->unsignedBigInteger('drop_id');
            $table->foreign('drop_id')->references('id')->on('drops');
            $table->timestamps();

        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('hash');
            $table->string('type'); // mint | transfer | claim
            $table->dateTime('date');
            $table->unsignedInteger('value_usd')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('nft_id')->nullable();
            $table->unsignedBigInteger('royalties_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('nft_id')->references('id')->on('nfts');
            $table->foreign('royalties_id')->references('id')->on('royalties');
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
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('royalties');
        Schema::dropIfExists('nfts');
        Schema::dropIfExists('drops');
        Schema::dropIfExists('tracks');
        Schema::dropIfExists('artist_extras');
        Schema::dropIfExists('artists');
    }
};
