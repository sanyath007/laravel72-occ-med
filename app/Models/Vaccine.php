<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    protected $table = "vaccines";

    // protected $primaryKey = "id";

    // public function type()
    // {
    //     return $this->belongsTo(InvestigationType::class, 'investigation_type_id', 'id');
    // }
}
