<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StdAssessment extends Model
{
    protected $table = "std_assessments";

    // protected $primaryKey = "id";

    // public function type()
    // {
    //     return $this->belongsTo(InvestigationType::class, 'investigation_type_id', 'id');
    // }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    // public function surveyors()
    // {
    //     return $this->hasMany(SurveyingSurveyor::class, 'survey_id', 'id');
    // }

    public function galleries()
    {
        return $this->hasMany(Gallery::class, 'guuid', 'guuid');
    }
}
