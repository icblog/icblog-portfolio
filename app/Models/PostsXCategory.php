<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class PostsXCategory extends Model{
    use HasFactory;
    protected $table = 'posts_x_categories';
    public $timestamps = false;
    public $incrementing = false;
}
