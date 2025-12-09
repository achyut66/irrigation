<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhotoImage extends Model
{
    use HasFactory;

    protected $table = 'photo_images';

    protected $fillable = ['photo_id', 'image'];
}
