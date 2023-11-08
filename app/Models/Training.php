<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $table = "trainings";

    // protected $primaryKey = "id";

    // public function type()
    // {
    //     return $this->belongsTo(InvestigationType::class, 'investigation_type_id', 'id');
    // }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }

    public function persons()
    {
        return $this->hasMany(TrainingPerson::class, 'train_id', 'id');
    }
}
