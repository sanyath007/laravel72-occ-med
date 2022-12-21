<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Right extends Model
{
    protected $table = "rights";
    
    public function type()
    {
        return $this->belongsTo(RightType::class, 'right_type_id', 'id');
    }
}
