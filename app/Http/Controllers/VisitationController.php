<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitation;
use App\Models\VisitationVisitor;

class VisitationController extends Controller
{
    public function search(Request $request)
    {
        $visitations = Visitation::with('division','visitors')->paginate(10);

        return response()->json($visitations);
    }

    public function getById($id)
    {
        $visitation = Visitation::find($id)->with('division','visitors');

        return response()->json($visitation);
    }

    public function store(Request $request) {
        $visitors = json_decode($request['visitors']);

        try {
            $visitation = new Visitation;
            $visitation->visit_date = $request['visit_date'];
            $visitation->visit_objective = $request['visit_objective'];
            $visitation->division_id = $request['division_id'];
            $visitation->company_id = $request['company_id'];
            $visitation->visitors = count($visitors);
            $visitation->num_of_patients = $request['num_of_patients'];
            $visitation->is_return_data = $request['is_return_data'];
            // $visitation->remark = $request['remark'];

            /** Upload file */
            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/visitaion/';

                if ($file->move($destinationPath, $fileName)) {
                    $visitation->file_attachment = $fileName;
                }
            }

            if ($visitation->save()) {
                if (count($visitors) > 0) {
                    foreach($visitors as $visitor) {
                        $newVisitor = new VisitationVisitor;
                        $newVisitor->visitation_id = $visitation->id;
                        $newVisitor->fullname = $visitor->fullname;
                        $newVisitor->position = $visitor->position;
                        $newVisitor->save();
                    }
                }

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
