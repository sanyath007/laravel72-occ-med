<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Screening extends Model
{
    protected $table = "screenings";

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id", "id");
    }
}
