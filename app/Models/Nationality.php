<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nationality extends Model
{
    protected $table = "nationalities";

    protected $primaryKey = "code";

    public $incrementing = false;
}
