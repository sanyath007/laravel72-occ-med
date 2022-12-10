<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    protected $table = "tb_register";

    public function student()
    {
        return $this->belongsTo(Student::class, "StudentID", "StudentID");
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, "SubjectCode", "SubjectCode");
    }
}
