<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function search(Request $request)
    {
        $employees = Employee::with('position','class','type')
                        ->whereNotIn('position_id', [1])
                        ->paginate(20);

        return response()->json($employees);
    }

    public function getAll(Request $request)
    {
        $employees = Employee::with('position', 'class', 'type')
                        ->whereNotIn('position_id', [1])
                        ->get();

        return response()->json($employees);
    }

    public function getById(Request $request, $id)
    {
        $employee = Employee::find($id);

        return response()->json($employee);
    }
}
