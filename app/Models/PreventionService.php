<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreventionService extends Model
{
    protected $table = "prevention_services";

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id", "id");
    }
}
