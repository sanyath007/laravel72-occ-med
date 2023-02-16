<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckupService extends Model
{
    protected $table = "checkup_services";

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id", "id");
    }
}
