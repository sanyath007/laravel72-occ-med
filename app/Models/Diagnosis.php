<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    protected $table = "diagnoses";

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id", "id");
    }
}
