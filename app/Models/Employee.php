<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = "employees";

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }

    public function class()
    {
        return $this->belongsTo(PositionClass::class, 'position_class_id', 'id');
    }

    public function type()
    {
        return $this->belongsTo(PositionType::class, 'position_type_id', 'id');
    }
}
