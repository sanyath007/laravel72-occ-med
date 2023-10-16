<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitationVisitor extends Model
{
    protected $table = "visitation_visitors";

    // protected $primaryKey = "id";

    // public function type()
    // {
    //     return $this->belongsTo(InvestigationType::class, 'investigation_type_id', 'id');
    // }

    public function visitation()
    {
        return $this->belongsTo(Visitation::class, 'visitation_id', 'id');
    }
}
