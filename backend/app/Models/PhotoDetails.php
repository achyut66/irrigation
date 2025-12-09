<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhotoDetails extends Model
{
    use HasFactory;

    protected $table = 'table_photoes';

    protected $fillable = ['title'];

    protected $appends = ['images_url'];

    // A PhotoDetails has many PhotoImages
    public function images()
    {
        return $this->hasMany(PhotoImage::class, 'photo_id'); 
    }

    // Return images with full URL
    public function getImagesUrlAttribute()
    {
        return $this->images->map(function ($img) {
            return asset('storage/photoes/' . $img->image);
        });
    }
}
