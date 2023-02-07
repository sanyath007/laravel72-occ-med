<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalCondition extends Model
{
    protected $table = "medical_conditions";

    public function patient()
    {
        return $this->belongsTo(Patient::class, "patient_id", "id");
    }

    public function disease()
    {
        return $this->belongsTo(Disease::class, "disease_id", "id");
    }
}
