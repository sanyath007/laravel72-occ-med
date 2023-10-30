<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ERPlan;
use App\Models\ERPlanPerson;
use App\Models\ERPlanExpert;
use App\Models\Company;

class ERPlanController extends Controller
{
    public function search(Request $request)
    {
        $date = $request->get('date');

        $plans = ERPlan::with('division','company','persons','experts')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->paginate(10);

        return response()->json($plans);
    }

    public function getById($id)
    {
        $plan = ERPlan::find($id)->with('division','company','persons','experts');

        return response()->json($plan);
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
            $persons = json_decode($request['persons']);
            $experts = json_decode($request['experts']);

            $plan = new ERPlan;
            $plan->plan_date            = $request['survey_date'];
            $plan->plan_type_id         = $request['plan_type_id'];
            $plan->incident_id          = $request['incident_id'];
            $plan->division_id          = $request['division_id'];
            $plan->company_id           = $request['company_id'];
            $plan->background           = $request['background'];
            $plan->topic                = $request['topic'];
            $plan->drill_hour           = $request['drill_hour'];
            $plan->target_group_id      = $request['target_group_id'];
            $plan->num_of_participants  = $request['num_of_participants'];
            $plan->equipments           = $request['equipments'];
            $plan->chemical_source      = $request['chemical_source'];
            $plan->remark               = $request['remark'];

            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/wts/file/';

                if ($file->move($destinationPath, $fileName)) {
                    $plan->file_attachment = $fileName;
                }
            }

            if ($request->file('pic_attachment')) {
                $file = $request->file('pic_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/wts/pic/';

                if ($file->move($destinationPath, $fileName)) {
                    $plan->pic_attachment = $fileName;
                }
            }

            if ($plan->save()) {
                // if (count($surveyors) > 0) {
                //     foreach($surveyors as $surveyor) {
                //         $newSurveyor = new SurveyingSurveyor;
                //         $newSurveyor->survey_id     = $surveying->id;
                //         $newSurveyor->employee_id   = $surveyor->id;
                //         $newSurveyor->save();
                //     }
                // }

                return [
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "plan"      => $plan
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
