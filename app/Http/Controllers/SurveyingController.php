<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surveying;
use App\Models\SurveyingSurveyor;
use App\Models\Company;

class SurveyingController extends Controller
{
    public function search(Request $request)
    {
        $date = $request->get('date');

        $surveyings = Surveying::with('division','company','surveyors','surveyors.employee')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->paginate(10);

        return response()->json($surveyings);
    }

    public function getById($id)
    {
        $surveying = Surveying::with('division','company','company.type','surveyors')
                        ->with('surveyors.employee','surveyors.employee.position','surveyors.employee.class')
                        ->find($id);

        return response()->json($surveying);
    }

    public function getInitialFormData()
    {
        $targets = [
            ['id' => 1, 'name' => 'พนักงาน'],
            ['id' => 2, 'name' => 'ประชาชนทั่วไป'],
            ['id' => 3, 'name' => 'เจ้าหน้าที่'],
            ['id' => 4, 'name' => 'นักเรียน/นักศึกษา'],
        ];

        return [
            'targets'   => $targets
        ];
    }

    public function store(Request $request) 
    {
        try {
            $surveying = new Surveying;
            $surveying->survey_date         = $request['survey_date'];
            $surveying->objective_id        = $request['objective_id'];
            $surveying->division_id         = $request['division_id'];
            $surveying->company_id          = $request['company_id'];
            $surveying->num_of_departs      = $request['num_of_departs'];
            $surveying->num_of_employees    = $request['num_of_employees'];
            $surveying->num_of_health_items = $request['num_of_health_items'];
            $surveying->is_found_threat     = $request['is_found_threat'] ? '1' : '0';
            $surveying->have_hra            = $request['have_hra'];
            $surveying->have_report         = $request['have_report'];
            $surveying->is_adviced          = $request['is_adviced'];
            $surveying->is_returned_data    = $request['is_returned_data'];
            $surveying->guidelines          = implode(',', $request['guidelines']);
            $surveying->remark              = $request['remark'];

            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/wts/file/';

                if ($file->move($destinationPath, $fileName)) {
                    $surveying->file_attachment = $fileName;
                }
            }

            if ($request->file('pic_attachments')) {
                $index = 0;
                $picNames = '';
                $destinationPath = 'uploads/wts/pic/';

                foreach($request->file('pic_attachments') as $file) {
                    $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

                    if ($file->move($destinationPath, $fileName)) {
                        if ($index < count($request->file('pic_attachments'))) {
                            $picNames .= $fileName.',';
                        } else {
                            $picNames .= $fileName;
                        }
                    }

                    $index++;
                }

                $surveying->pic_attachments = $picNames;
            }

            if ($surveying->save()) {
                if (count($request['surveyors']) > 0) {
                    foreach($request['surveyors'] as $surveyor) {
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_id     = $surveying->id;
                        $newSurveyor->employee_id   = $surveyor['employee_id'];
                        $newSurveyor->save();
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "surveying"     => $surveying
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
            $surveying = Surveying::find($id);
            $surveying->survey_date         = $request['survey_date'];
            $surveying->objective_id        = $request['objective_id'];
            $surveying->division_id         = $request['division_id'];
            $surveying->company_id          = $request['company_id'];
            $surveying->num_of_departs      = $request['num_of_departs'];
            $surveying->num_of_employees    = $request['num_of_employees'];
            $surveying->num_of_health_items = $request['num_of_health_items'];
            $surveying->is_found_threat     = $request['is_found_threat'] ? '1' : '0';
            $surveying->have_hra            = $request['have_hra'];
            $surveying->have_report         = $request['have_report'];
            $surveying->is_adviced          = $request['is_adviced'];
            $surveying->is_returned_data    = $request['is_returned_data'];
            $surveying->guidelines          = implode(',', $request['guidelines']);
            $surveying->remark              = $request['remark'];

            // if ($request->file('file_attachment')) {
            //     $file = $request->file('file_attachment');
            //     $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
            //     $destinationPath = 'uploads/wts/file/';

            //     if ($file->move($destinationPath, $fileName)) {
            //         $surveying->file_attachment = $fileName;
            //     }
            // }

            // if ($request->file('pic_attachments')) {
            //     $index = 0;
            //     $picNames = '';
            //     $destinationPath = 'uploads/wts/pic/';

            //     foreach($request->file('pic_attachments') as $file) {
            //         $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

            //         if ($file->move($destinationPath, $fileName)) {
            //             if ($index < count($request->file('pic_attachments'))) {
            //                 $picNames .= $fileName.',';
            //             } else {
            //                 $picNames .= $fileName;
            //             }
            //         }

            //         $index++;
            //     }

            //     $surveying->pic_attachments = $picNames;
            // }

            if ($surveying->save()) {
                if (count($request['surveyors']) > 0) {
                    foreach($request['surveyors'] as $surveyor) {
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_id     = $surveying->id;
                        $newSurveyor->employee_id   = $surveyor['employee_id'];
                        $newSurveyor->save();
                    }
                }

                return [
                    'status'    => 1,
                    'message'   => 'Updating successfully!!',
                    "surveying" => $surveying
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
            $surveying = Surveying::find($id);

            // if ($request->file('file_attachment')) {
            //     $file = $request->file('file_attachment');
            //     $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
            //     $destinationPath = 'uploads/wts/file/';

            //     if ($file->move($destinationPath, $fileName)) {
            //         $surveying->file_attachment = $fileName;
            //     }
            // }

            // if ($request->file('pic_attachments')) {
            //     $index = 0;
            //     $picNames = '';
            //     $destinationPath = 'uploads/wts/pic/';

            //     foreach($request->file('pic_attachments') as $file) {
            //         $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

            //         if ($file->move($destinationPath, $fileName)) {
            //             if ($index < count($request->file('pic_attachments'))) {
            //                 $picNames .= $fileName.',';
            //             } else {
            //                 $picNames .= $fileName;
            //             }
            //         }

            //         $index++;
            //     }

            //     $surveying->pic_attachments = $picNames;
            // }

            if ($surveying->delete()) {
                SurveyingSurveyor::where('survey_id', $id)->delete();

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
