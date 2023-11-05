<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Pname;
use App\Models\Position;
use App\Models\PositionClass;
use App\Models\PositionType;

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

    public function getInitialFormData()
    {
        return [
            'prefixes'          => Pname::all(),
            'positions'         => Position::all(),
            'positionClasses'   => PositionClass::all(),
            'positionTypes'     => PositionType::all(),
        ];
    }

    public function store(Request $request)
    {
        try {
            $employee = new Employee;
            $employee->cid          = $request['cid'];
            $employee->prefix       = $request['prefix'];
            $employee->fname        = $request['fname'];
            $employee->lname        = $request['lname'];
            $employee->sex          = $request['sex'];
            $employee->birthdate    = $request[''];
            $employee->tel1         = $request['tel1'];
            $employee->tel2         = $request['tel2'];
            // $employee->email      = $request['email'];
            $employee->position_id  = $request['position_id'];
            $employee->position_class_id = $request['position_class_id'];
            $employee->position_type_id = $request['position_type_id'];
            $employee->assigned_date = $request['assigned_date'];
            $employee->started_date = $request['started_date'];
            $employee->remark       = $request['remark'];

            if ($employee->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "employee"  => $employee
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $employee = Employee::find($id);
            $employee->cid          = $request['cid'];
            $employee->prefix       = $request['prefix'];
            $employee->fname        = $request['fname'];
            $employee->lname        = $request['lname'];
            $employee->sex          = $request['sex'];
            $employee->birthdate    = $request[''];
            $employee->tel1         = $request['tel1'];
            $employee->tel2         = $request['tel2'];
            // $employee->email      = $request['email'];
            $employee->position_id  = $request['position_id'];
            $employee->position_class_id = $request['position_class_id'];
            $employee->position_type_id = $request['position_type_id'];
            $employee->assigned_date = $request['assigned_date'];
            $employee->started_date = $request['started_date'];
            $employee->remark       = $request['remark'];

            if ($employee->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Updating successfully!!',
                    "employee"  => $employee
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }

    public function delete($id)
    {
        try {
            $employee = Employee::find($id);

            if ($employee->delete()) {
                return [
                    'status'    => 1,
                    'message'   => 'Deleting successfully!!',
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }
}
