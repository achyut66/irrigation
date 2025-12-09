<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsAndArticles extends Model
{
    use HasFactory;

    protected $table = 'news_and_articles';

    protected $fillable = [
        'heading',
        'news',
        'image',
    ];

    // To automatically append full URL for Next.js
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/news/' . $this->image);
    }
}
