<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\ERPlan;
use App\Models\ERPlanPerson;
use App\Models\ERPlanExpert;
use App\Models\SurveyingSurveyor;
use App\Models\Company;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class ERPlanController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/erplan/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $date = $request->get('date');

        $plans = ERPlan::with('division','company','experts','persons','galleries')
                        ->with('persons.employee','persons.employee.position','persons.employee.level')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->orderBy('plan_date', 'DESC')
                        ->paginate(10);

        return response()->json($plans);
    }

    public function getById($id)
    {
        $plan = ERPlan::with('division','company','experts','persons','galleries')
                        ->with('persons.employee','persons.employee.position','persons.employee.level')
                        ->find($id);

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
            $plan->guuid                = Uuid::uuid4();

            /** Upload file */
            $plan->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($plan->save()) {
                /** ผู้จัดกิจกรรม */
                foreach($request['persons'] as $person) {
                    $newPerson = new ERPlanPerson;
                    $newPerson->plan_id         = $plan->id;
                    $newPerson->employee_id     = $person['employee_id'];
                    $newPerson->save();

                    $newSurveyor = new SurveyingSurveyor;
                    $newSurveyor->survey_type_id = 5;
                    $newSurveyor->survey_id      = $plan->id;
                    $newSurveyor->employee_id    = $person['employee_id'];
                    $newSurveyor->save();
                }

                /** ผู้เชี่ยวชาญ */
                if ($request['experts'] && count($request['experts']) > 0) {
                    foreach($request['experts'] as $expert) {
                        $newExpert = new ERPlanExpert;
                        $newExpert->plan_id   = $plan->id;
                        $newExpert->name      = $expert['name'];
                        $newExpert->position  = $expert['position'];
                        $newExpert->company   = $expert['company'];
                        $newExpert->save();
                    }
                }

                /** Insert galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $plan->guuid;
                        $gallery->save();
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

    public function update(Request $request, $id) 
    {
        try {
            $plan = ERPlan::find($id);
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
            $plan->guuid                = !empty($plan->guuid) ? $plan->guuid : Uuid::uuid4();

            /** Check and remove uploaded file */
            if ($request['is_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($plan->file_attachment)) {
                    Storage::disk('public')->delete($plan->file_attachment);
                }

                $plan->file_attachment = '';
            }

            /** Upload file */
            if ($request->file('file_attachment')) {
                $plan->file_attachment = $this->fileService->uploadFile(
                    $request->file('file_attachment'),
                    $this->uploadDestPath . 'file'
                );
            }

            /** Upload new pictures */
            $pictures = [];
            if ($request->file('pictures')) {
                $pictures = $this->fileService->uploadMultipleImages(
                    $request->file('pictures'),
                    $this->uploadDestPath . 'pic'
                );
            }

            if ($plan->save()) {
                /** ผู้จัดกิจกรรม */
                foreach($request['persons'] as $person) {
                    if (array_key_exists('plan_id', $person)) {
                        /** รายการเดิม ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่ */
                        if (array_key_exists('removed', $person) && $person['removed']) {
                            ERPlanPerson::find($person['id'])->delete();
                            SurveyingSurveyor::find($person['id'])->delete();
                        }
                    } else {
                        /** รายการใหม่ */
                        $newPerson = new ERPlanPerson;
                        $newPerson->plan_id     = $plan->id;
                        $newPerson->employee_id = $person['employee_id'];
                        $newPerson->save();

                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_type_id = 5;
                        $newSurveyor->survey_id      = $plan->id;
                        $newSurveyor->employee_id    = $person['employee_id'];
                        $newSurveyor->save();
                    }
                }

                /** ผู้เชี่ยวชาญ */
                if (array_key_exists('experts', $request) && count($request['experts']) > 0) {
                    foreach($request['experts'] as $expert) {
                        if (array_key_exists('plan_id', $expert)) {
                            /** รายการเดิม ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่ */
                            if (array_key_exists('removed', $expert) && $expert['removed']) {
                                ERPlanExpert::find($expert['id'])->delete();
                            }
                        } else {
                            /** รายการใหม่ */
                            $newExpert = new ERPlanExpert;
                            $newExpert->plan_id   = $plan->id;
                            $newExpert->name      = $expert['name'];
                            $newExpert->position  = $expert['position'];
                            $newExpert->company   = $expert['company'];
                            $newExpert->save();
                        }
                    }
                }

                /** Insert new galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $plan->guuid;
                        $gallery->save();
                    }
                }

                /** ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่ */
                if ($request['galleries'] && count($request['galleries']) > 0) {
                    foreach($request['galleries'] as $pic) {
                        if (array_key_exists('removed', $pic) && $pic['removed']) {
                            /** Remove physical file */
                            if (Storage::disk('public')->exists($pic['path'])) {
                                Storage::disk('public')->delete($pic['path']);
                            }

                            Gallery::find($pic['id'])->delete();
                        }
                    }
                }

                return [
                    'status'    => 1,
                    'message'   => 'Updating successfully!!',
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

    public function destroy($id) 
    {
        try {
            $plan = ERPlan::with('galleries')->find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($plan->file_attachment)) {
                Storage::disk('public')->delete($plan->file_attachment);
            }

            if (count($plan->galleries) > 0) {
                foreach($plan->galleries as $pic) {
                    if (Storage::disk('public')->exists($pic->path)) {
                        Storage::disk('public')->delete($pic->path);

                        Gallery::find($pic->id)->delete();
                    }
                }
            }

            if ($plan->delete()) {
                /** ผู้จัดกิจกรรม */
                ERPlanPerson::where('plan_id', $id)->delete();
                SurveyingSurveyor::where(['survey_id' => $id, 'survey_type_id' => 5])->delete();

                /** ผู้เชี่ยวชาญ */
                ERPlanExpert::where('plan_id', $id)->delete();

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

    public function generateGuuid()
    {
        try {
            $plans = ERPlan::all();

            foreach($plans as $plan) {
                if ($plan->pic_attachments) {
                    $pictures = explode(',', $plan->pic_attachments);

                    /** update plans data */
                    $updated = ERPlan::find($plan->id);
                    $updated->guuid = Uuid::uuid4();
                    $updated->save();
                    
                    /** insert new galleries data */
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $this->uploadDestPath . 'pic/' . $pic;
                        $gallery->guuid = $updated->guuid;
                        $gallery->save();
                    }
                }
            }

            return [
                'status'    => 'ok',
                'message'   => 'Processing successfully!!',
            ];
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }
}
