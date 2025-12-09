<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HighlightNews extends Model
{
    use HasFactory;
    protected $table = 'table_highlight_news';

    protected $fillable = [
        'title',
        'highlight_news',
        'image',
    ];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/highlight/' . $this->image);
    }
}
