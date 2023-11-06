<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Investigation;
use App\Models\InvestigationType;

class InvestigationController extends Controller
{
    public function search(Request $request)
    {
        $investigations = Investigation::with('type','division')->paginate(10);

        return response()->json($investigations);
    }

    public function getById($id)
    {
        $investigation = Investigation::with('type','division')->find($id);

        return response()->json($investigation);
    }

    public function store(Request $request) {
        try {
            $investigation = new Investigation;
            $investigation->investigate_date = $request['investigate_date'];
            $investigation->investigate_objective = $request['investigate_objective'];
            $investigation->investigate_type_id = $request['investigate_type_id'];
            $investigation->is_working_disease = $request['is_working_disease'];
            $investigation->is_investigate = $request['is_investigate'];
            $investigation->division_id = $request['division_id'];
            $investigation->investigate_place = $request['investigate_place'];
            $investigation->num_of_people = $request['num_of_people'];
            $investigation->file_attachment = $request['file_attachment'];
            $investigation->pic_attachment = $request['pic_attachment'];
            $investigation->is_return_data = $request['is_return_data'];
            // $investigation->remark = $request['remark'];

            if ($investigation->save()) {
                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "investigation" => $investigation
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

    public function update(Request $request, $id) {
        try {
            $investigation = Investigation::find($id);
            $investigation->investigate_date = $request['investigate_date'];
            $investigation->investigate_objective = $request['investigate_objective'];
            $investigation->investigate_type_id = $request['investigate_type_id'];
            $investigation->is_working_disease = $request['is_working_disease'];
            $investigation->is_investigate = $request['is_investigate'];
            $investigation->division_id = $request['division_id'];
            $investigation->investigate_place = $request['investigate_place'];
            $investigation->num_of_people = $request['num_of_people'];
            $investigation->file_attachment = $request['file_attachment'];
            $investigation->pic_attachment = $request['pic_attachment'];
            $investigation->is_return_data = $request['is_return_data'];
            // $investigation->remark = $request['remark'];

            if ($investigation->save()) {
                return [
                    'status'        => 1,
                    'message'       => 'Updating successfully!!',
                    "investigation" => $investigation
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

    public function destroy($id) {
        try {
            $investigation = Investigation::find($id);

            if ($investigation->delete()) {
                return [
                    'status'        => 1,
                    'message'       => 'Deleting successfully!!',
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
