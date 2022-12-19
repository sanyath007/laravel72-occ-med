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
}
