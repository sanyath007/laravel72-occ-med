<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NetworkMeeting extends Model
{
    protected $table = "network_meetings";

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
