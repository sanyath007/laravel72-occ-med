<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromotionService extends Model
{
    protected $table = "promotion_services";

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id", "id");
    }
}
