<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitation;
use App\Models\VisitationVisitor;

class VisitationController extends Controller
{
    public function search(Request $request)
    {
        $visitations = Visitation::with('division','company','visitors')
                            ->orderBy('visit_date', 'DESC')
                            ->paginate(10);

        return response()->json($visitations);
    }

    public function getById($id)
    {
        $visitation = Visitation::with('division','company','visitors')->find($id);

        return response()->json($visitation);
    }

    public function store(Request $request)
    {
        try {
            $visitation = new Visitation;
            $visitation->visit_date         = $request['visit_date'];
            $visitation->visit_objective    = $request['visit_objective'];
            $visitation->division_id        = $request['division_id'];
            $visitation->company_id         = $request['company_id'];
            $visitation->num_of_patients    = $request['num_of_patients'];
            $visitation->is_return_data     = $request['is_return_data'];
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
                if (count($request['visitors']) > 0) {
                    foreach($request['visitors'] as $visitor) {
                        $newVisitor = new VisitationVisitor;
                        $newVisitor->visitation_id = $visitation->id;
                        $newVisitor->fullname = $visitor['fullname'];
                        $newVisitor->position = $visitor['position'];
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

    public function update(Request $request, $id)
    {
        try {
            $visitation = Visitation::find($id);
            $visitation->visit_date         = $request['visit_date'];
            $visitation->visit_objective    = $request['visit_objective'];
            $visitation->division_id        = $request['division_id'];
            $visitation->company_id         = $request['company_id'];
            $visitation->num_of_patients    = $request['num_of_patients'];
            $visitation->is_return_data     = $request['is_return_data'];
            // $visitation->remark = $request['remark'];

            /** Upload file and pictures */
            if ($request->file('file_attachment')) {
                $destinationPath = 'uploads/visitaion/';
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

                /** Check and remove uploaded file */
                $existedFile = $destinationPath . $visitation->file_attachment;
                if (\File::exists($existedFile)) {
                    \File::delete($existedFile);
                }

                if ($file->move($destinationPath, $fileName)) {
                    $visitation->file_attachment = $fileName;
                }
            }

            if ($visitation->save()) {
                if (count($request['visitors']) > 0) {
                    foreach($request['visitors'] as $visitor) {
                        if (array_key_exists('id', $visitor)) {
                            /** รายการเดิม */
                            $newVisitor = VisitationVisitor::find($visitor['id']);
                            $newVisitor->fullname = $visitor['fullname'];
                            $newVisitor->position = $visitor['position'];
                            $newVisitor->save();
                        } else {
                            /** รายการใหม่ */
                            $newVisitor = new VisitationVisitor;
                            $newVisitor->visitation_id = $visitation->id;
                            $newVisitor->fullname = $visitor['fullname'];
                            $newVisitor->position = $visitor['position'];
                            $newVisitor->save();
                        }
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Updating successfully!!',
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

    public function destroy($id)
    {
        try {
            $visitation = Visitation::find($id);

            /** Remove uploaded file */
            $destinationPath = 'uploads/visitaion/';
            $existedFile = $destinationPath . $visitation->file_attachment;
            if (\File::exists($existedFile)) {
                \File::delete($existedFile);
            }

            if ($visitation->delete()) {
                VisitationVisitor::where('visitation_id', $id)->delete();

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
