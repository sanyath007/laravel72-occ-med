<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitation;
// use App\Models\VisitationType;

class VisitationController extends Controller
{
    public function search(Request $request)
    {
        $visitations = Visitation::with('division')->paginate(10);

        return response()->json($visitations);
    }

    public function getById($id)
    {
        $visitation = Visitation::find($id)->with('division');

        return response()->json($visitation);
    }

    public function store(Request $request) {
        try {
            $visitation = new Visitation;
            $visitation->visit_date = $request['visit_date'];
            $visitation->visit_objective = $request['visit_objective'];
            $visitation->division_id = $request['division_id'];
            $visitation->company_id = $request['company_id'];
            $visitation->visitors = $request['visitors'];
            $visitation->num_of_patients = $request['num_of_patients'];
            $visitation->file_attachment = $request['file_attachment'];
            $visitation->is_return_data = $request['is_return_data'];
            // $visitation->remark = $request['remark'];

            if ($visitation->save()) {
                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "visitation"    => $visitation
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
