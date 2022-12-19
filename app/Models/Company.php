<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = "companies";

    public function type()
    {
        return $this->belongsTo(CompanyType::class, 'company_type_id', 'id');
    }

    public function tambon()
    {
        return $this->belongsTo(Tambon::class, 'tambon_id', 'id');
    }

    public function amphur()
    {
        return $this->belongsTo(Amphur::class, 'amphur_id', 'id');
    }

    public function changwat()
    {
        return $this->belongsTo(Changwat::class, 'changwat_id', 'chw_id');
    }
}
