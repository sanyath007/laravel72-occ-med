<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\Employee;

class DoctorController extends Controller
{
    public function getDoctors(Request $request)
    {
        $doctors = Doctor::with('employee')->get();

        return response()->json($doctors);
    }
}
