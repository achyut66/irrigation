<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerDetails extends Model
{
    use HasFactory;
    protected $table = 'table_banner_details';

    protected $fillable = [
        'banner_desc',
        'image',
    ];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/banner/' . $this->image);
    }
}
