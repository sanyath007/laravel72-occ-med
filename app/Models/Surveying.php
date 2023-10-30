<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class surveying extends Model
{
    protected $table = "surveyings";

    // protected $primaryKey = "id";

    // public function type()
    // {
    //     return $this->belongsTo(InvestigationType::class, 'investigation_type_id', 'id');
    // }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function surveyors()
    {
        return $this->hasMany(SurveyingSurveyor::class, 'survey_id', 'id');
    }
}
