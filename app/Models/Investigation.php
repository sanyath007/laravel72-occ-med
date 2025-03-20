<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investigation extends Model
{
    protected $table = "investigations";

    // protected $primaryKey = "id";

    public function type()
    {
        return $this->belongsTo(InvestigationType::class, 'investigation_type_id', 'id');
    }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class, 'guuid', 'guuid');
    }
}
