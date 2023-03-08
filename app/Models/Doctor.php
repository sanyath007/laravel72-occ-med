<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $table = "doctors";

    public function employee()
    {
        return $this->hasOne(Employee::class, 'id', 'id');
    }
}
