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
            $plan = new ERPlan;
            $plan->plan_date            = $request['plan_date'];
            $plan->plan_type_id         = $request['plan_type_id'];
            $plan->incident_id          = $request['incident_id'];
            $plan->division_id          = $request['division_id'];
            $plan->company_id           = $request['company_id'];
            $plan->topic                = $request['topic'];
            $plan->background           = $request['background'];
            $plan->drill_hour           = $request['drill_hour'];
            $plan->target_group_id      = $request['target_group_id'];
            $plan->num_of_participants  = $request['num_of_participants'];
            $plan->equipment_eye        = $request['equipment_eye'];
            $plan->equipment_face       = $request['equipment_face'];
            $plan->equipment_hand       = $request['equipment_hand'];
            $plan->equipment_foot       = $request['equipment_foot'];
            $plan->equipment_ear        = $request['equipment_ear'];
            $plan->chemical_source      = $request['chemical_source'];
            $plan->remark               = $request['remark'];

            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/erp/file/';

                if ($file->move($destinationPath, $fileName)) {
                    $plan->file_attachment = $fileName;
                }
            }

            if ($request->file('pic_attachments')) {
                $index = 0;
                $picNames = '';
                $destinationPath = 'uploads/erp/pic/';

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

                $plan->pic_attachments = $picNames;
            }

            if ($plan->save()) {
                /** ผู้จัดกิจกรรม */
                if (count($request['persons']) > 0) {
                    foreach($request['persons'] as $person) {
                        $newPerson = new ERPlanPerson;
                        $newPerson->plan_id   = $plan->id;
                        $newPerson->name      = $person['name'];
                        $newPerson->position  = $person['position'];
                        $newPerson->company   = $person['company'];
                        $newPerson->save();
                    }
                }

                /** ผู้เชี่ยวชาญ */
                if (count($request['experts']) > 0) {
                    foreach($request['experts'] as $expert) {
                        $newExpert = new ERPlanExpert;
                        $newExpert->plan_id   = $plan->id;
                        $newExpert->name      = $expert['name'];
                        $newExpert->position  = $expert['position'];
                        $newExpert->company   = $expert['company'];
                        $newExpert->save();
                    }
                }

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