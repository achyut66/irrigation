<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KaryasamitiSetting extends Model
{
    use HasFactory;
    protected $table = 'table_setting_karyasamiti';
    protected $fillable = [
        'full_name',
        'designation',
        'address',
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

        return asset('storage/karyasamiti/' . $this->image);
    }
}
