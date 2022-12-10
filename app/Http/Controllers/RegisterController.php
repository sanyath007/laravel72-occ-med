<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Register;
use App\Models\Student;
use App\Models\Subject;

class RegisterController extends Controller
{
    public function getRegisters(Request $request)
    {
        $class      = $request->get('class');
        $student    = $request->get('student');

        $registers = Register::with('student','subject')
                                ->when(!empty($class), function($query) use ($class) {
                                    $query->where('RegisterClass', $class);
                                })
                                ->when(!empty($student), function($query) use ($student) {
                                    $query->where('StudentID', $student);
                                })
                                ->get();

        return [
            "registers" => $registers
        ]
    }
}
