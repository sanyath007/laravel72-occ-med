<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyingSurveyor extends Model
{
    protected $table = "surveying_surveyors";

    // protected $primaryKey = "id";

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }
}
