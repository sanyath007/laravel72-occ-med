<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function getEmployees(Request $request)
    {
        $employees = Employee::whereNotIn('position_id', [1])->paginate(20);

        return response()->json($employees);
    }
}
