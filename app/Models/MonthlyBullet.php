<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MonthlyBullet extends Model
{
    protected $table = "monthly_bullets";

    public function monthly()
    {
        return $this->belongsTo(Monthly::class, 'monthly_id', 'id');
    }

    public function bullet()
    {
        return $this->belongsTo(ReportBullet::class, 'report_bullet_id', 'id');
    }
}
