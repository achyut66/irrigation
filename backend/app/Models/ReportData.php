<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportData extends Model
{
    protected $table = 'table_admin_report';

    protected $fillable = ['title', 'report_file'];

    protected $appends = ['file_url'];

    public function getFileUrlAttribute()
    {
        if (!$this->report_file) return null;
        return asset('storage/report/' . $this->report_file);
    }
}

