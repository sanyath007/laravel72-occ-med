<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitation extends Model
{
    protected $table = "visitations";

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

    // public function visitors()
    // {
    //     return $this->hasMany(VisitationVisitor::class, 'visitation_id', 'id');
    // }

    public function visitors()
    {
        return $this->hasMany(SurveyingSurveyor::class, 'survey_id', 'id')->where('survey_type_id', 4);
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class, 'guuid', 'guuid');
    }
}
