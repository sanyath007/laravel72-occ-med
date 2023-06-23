<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OccupationMonthly extends Model
{
    protected $table = "occupation_monthly";

    public function bullet()
    {
        return $this->belongsTo(ReportBullet::class, 'report_bullet_id', 'id');
    }
}
