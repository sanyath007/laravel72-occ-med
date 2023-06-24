<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Monthly extends Model
{
    protected $table = "monthlies";

    public function bullet()
    {
        return $this->belongsTo(ReportBullet::class, 'report_bullet_id', 'id');
    }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}
