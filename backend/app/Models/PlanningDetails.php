<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanningDetails extends Model
{
    use HasFactory;
    protected $table = 'table_plan_programme';

    protected $fillable = [
        'title',
        'description',
        'image',
    ];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/plan/' . $this->image);
    }
}
