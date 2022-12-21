<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $table = 'patients';

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

    public function bloodGroup()
    {
        return $this->belongsTo(BloodGroup::class, 'blood_group_id', 'id');
    }

    public function right()
    {
        return $this->belongsTo(Right::class, 'right_id', 'id');
    }

    public function nationality()
    {
        return $this->belongsTo(Nationality::class, 'nationality_id', 'code');
    }

    public function hospMain()
    {
        return $this->belongsTo(Hospital::class, 'hosp_main_id', 'code');
    }
}
