<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonnelData extends Model
{
    use HasFactory;
    protected $table = 'table_authority_personnel';

    protected $fillable = [
        'full_name',
        'position',
        'mobile_no',
        'email',
        'image',
    ];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/personnel/' . $this->image);
    }
}
