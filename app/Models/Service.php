<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = "services";

    public function patient()
    {
        return $this->belongsTo(Patient::class, "patient_id", "id");
    }

    public function company()
    {
        return $this->belongsTo(Company::class, "company_id", "id");
    }

    public function right()
    {
        return $this->belongsTo(Right::class, "right_id", "id");
    }

    public function diag()
    {
        return $this->belongsTo(Icd10::class, "pdx", "code");
    }
}
