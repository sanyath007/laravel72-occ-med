<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicMonthly extends Model
{
    protected $table = "clinic_monthly";

    public function bullet()
    {
        return $this->belongsTo(ReportBullet::class, 'report_bullet_id', 'id');
    }
}
