<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Icd10 extends Model
{
    protected $table = "icd101";

    protected $primaryKey = "code";

    public $incrementing = false;

    public $timestamps = false;
}
