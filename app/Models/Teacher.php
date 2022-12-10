<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = "tb_teachers";

    protected $primaryKey = "TeacherCode";
}
