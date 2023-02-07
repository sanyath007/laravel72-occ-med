<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checkup extends Model
{
    protected $table = "checkups";

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id", "id");
    }
}
