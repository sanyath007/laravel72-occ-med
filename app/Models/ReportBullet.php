<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportBullet extends Model
{
    protected $table = "report_bullets";

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(ReportBullet::class, 'subitem_of', 'id');
    }
}
