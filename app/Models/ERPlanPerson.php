<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ERPlanPerson extends Model
{
    protected $table = "er_plan_persons";

    // protected $primaryKey = "id";

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }
}
