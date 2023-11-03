<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProactiveScreening extends Model
{
    protected $table = "proactive_screenings";

    // protected $primaryKey = "id";

    // public function type()
    // {
    //     return $this->belongsTo(InvestigationType::class, 'investigation_type_id', 'id');
    // }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}
