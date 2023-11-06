<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProactiveScreening;
use App\Models\Company;

class ProactiveScreeningController extends Controller
{
    public function search(Request $request)
    {
        $date = $request->get('date');

        $screenings = ProactiveScreening::with('division')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->paginate(10);

        return response()->json($screenings);
    }

    public function getById($id)
    {
        $screening = ProactiveScreening::with('division')->find($id);

        return response()->json($screening);
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
            $screening = new ProactiveScreening;
            $screening->screen_date     = $request['screen_date'];
            $screening->screen_type_id  = $request['screen_type_id'];
            $screening->division_id     = $request['division_id'];
            $screening->place           = $request['place'];
            $screening->target_group_id  = $request['target_group_id'];
            $screening->target_group_text = $request['target_group_text'];
            $screening->total           = $request['total'];
            $screening->total_normal    = $request['total_normal'];
            $screening->total_risk      = $request['total_risk'];
            $screening->total_abnormal  = $request['total_abnormal'];
            $screening->question        = $request['question'];
            $screening->question_normal = $request['question_normal'];
            $screening->question_risk   = $request['question_risk'];
            $screening->question_abnormal = $request['question_abnormal'];
            $screening->body            = $request['body'];
            $screening->body_normal     = $request['body_normal'];
            $screening->body_risk       = $request['body_risk'];
            $screening->body_abnormal   = $request['body_abnormal'];
            $screening->hearing         = $request['hearing'];
            $screening->hearing_normal  = $request['hearing_normal'];
            $screening->hearing_risk    = $request['hearing_risk'];
            $screening->hearing_abnormal = $request['hearing_abnormal'];
            $screening->lung            = $request['lung'];
            $screening->lung_normal     = $request['lung_normal'];
            $screening->lung_risk       = $request['lung_risk'];
            $screening->lung_abnormal   = $request['lung_abnormal'];
            $screening->xlung           = $request['xlung'];
            $screening->xlung_normal    = $request['xlung_normal'];
            $screening->xlung_risk      = $request['xlung_risk'];
            $screening->xlung_abnormal  = $request['xlung_abnormal'];
            $screening->vision          = $request['vision'];
            $screening->vision_normal   = $request['vision_normal'];
            $screening->vision_risk     = $request['vision_risk'];
            $screening->vision_abnormal = $request['vision_abnormal'];
            $screening->exposure        = $request['exposure'];
            $screening->exposure_normal = $request['exposure_normal'];
            $screening->exposure_risk   = $request['exposure_risk'];
            $screening->exposure_abnormal = $request['exposure_abnormal'];
            $screening->other           = $request['other'];
            $screening->other_normal    = $request['other_normal'];
            $screening->other_risk      = $request['other_risk'];
            $screening->other_abnormal  = $request['other_abnormal'];
            $screening->referal         = $request['referal'];
            $screening->surveillance    = $request['surveillance'];
            $screening->have_plan       = $request['have_plan'];
            $screening->have_summary    = $request['have_summary'];
            $screening->is_returned_data = $request['is_returned_data'];
            // $screening->remark           = $request['remark'];

            if ($request->file('plan_file')) {
                $file = $request->file('plan_file');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/screening/file/';

                if ($file->move($destinationPath, $fileName)) {
                    $screening->plan_file = $fileName;
                }
            }

            if ($request->file('summary_file')) {
                $file = $request->file('summary_file');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/screening/file/';

                if ($file->move($destinationPath, $fileName)) {
                    $screening->summary_file = $fileName;
                }
            }

            if ($screening->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "screening" => $screening
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
