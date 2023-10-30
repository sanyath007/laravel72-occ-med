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
        $surveying = Surveying::find($id)->with('division','company','surveyors','surveyors.employee');

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
            $surveyors = json_decode($request['surveyors']);
            $guidelines = json_decode($request['guidelines']);

            $surveying = new Surveying;
            $surveying->survey_date         = $request['survey_date'];
            $surveying->objective_id        = $request['objective_id'];
            $surveying->division_id         = $request['division_id'];
            $surveying->surveyors           = count($surveyors);
            $surveying->company_id          = $request['company_id'];
            $surveying->num_of_departs      = $request['num_of_departs'];
            $surveying->num_of_employees    = $request['num_of_employees'];
            $surveying->num_of_health_items = $request['num_of_health_items'];
            $surveying->is_found_threat     = $request['is_found_threat'];
            $surveying->have_hra            = $request['have_hra'];
            $surveying->have_report         = $request['have_report'];
            $surveying->is_adviced          = $request['is_adviced'];
            $surveying->is_returned_data    = $request['is_returned_data'];
            $surveying->guidelines          = count($guidelines);
            $surveying->remark              = $request['remark'];

            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/surveying/file/';

                if ($file->move($destinationPath, $fileName)) {
                    $surveying->file_attachment = $fileName;
                }
            }

            if ($request->file('pic_attachment')) {
                $file = $request->file('pic_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/surveying/pic/';

                if ($file->move($destinationPath, $fileName)) {
                    $surveying->pic_attachment = $fileName;
                }
            }

            if ($surveying->save()) {
                if (count($surveyors) > 0) {
                    foreach($surveyors as $surveyor) {
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_id     = $surveying->id;
                        $newSurveyor->employee_id   = $surveyor->id;
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
}
