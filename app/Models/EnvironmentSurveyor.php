<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnvironmentSurveyor extends Model
{
    protected $table = "environment_surveyors";

    // protected $primaryKey = "id";

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }
}
