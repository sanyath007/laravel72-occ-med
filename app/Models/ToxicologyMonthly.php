<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToxicologyMonthly extends Model
{
    protected $table = "toxicology_monthly";

    public function bullet()
    {
        return $this->belongsTo(ReportBullet::class, 'report_bullet_id', 'id');
    }
}
