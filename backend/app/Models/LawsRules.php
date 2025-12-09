<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawsRules extends Model
{
    use HasFactory;

    protected $table = 'table_admin_laws_rules';

    protected $fillable = [
        'title',
        'description',
        'image',
    ];

    // To automatically append full URL for Next.js
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/laws/' . $this->image);
    }
}