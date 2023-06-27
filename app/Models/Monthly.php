<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Monthly extends Model
{
    protected $table = "monthlies";

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }

    public function bullets()
    {
        return $this->hasMany(MonthlyBullet::class, 'monthly_id', 'id');
    }
}
