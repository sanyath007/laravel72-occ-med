<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function getEmployees(Request $request)
    {
        $employees = Employee::all();

        return response()->json($employees);
    }
}
