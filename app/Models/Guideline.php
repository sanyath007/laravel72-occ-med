<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guideline extends Model
{
    protected $table = "guidelines";

    // protected $primaryKey = "id";

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}
