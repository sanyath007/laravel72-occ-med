<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\ProactiveScreening;
use App\Models\Company;
use App\Services\FileService;

class ProactiveScreeningController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/screening/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $date = $request->get('date');

        $screenings = ProactiveScreening::with('division')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->orderBy('screen_date', 'DESC')
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

            /** Upload file */
            $screening->plan_file = $this->fileService->uploadFile(
                $request->file('plan_file'),
                $this->uploadDestPath . 'file'
            );

            $screening->summary_file = $this->fileService->uploadFile(
                $request->file('summary_file'),
                $this->uploadDestPath . 'file'
            );

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

    public function update(Request $request, $id) 
    {
        try {
            $screening = ProactiveScreening::find($id);
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

            /** Check and remove uploaded plan file */
            if ($request['is_plan_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($screening->plan_file)) {
                    Storage::disk('public')->delete($screening->plan_file);
                }

                $screening->plan_file = '';
            }

            /** Upload plan file */
            if ($request->file('plan_file')) {
                $screening->plan_file = $this->fileService->uploadFile(
                    $request->file('plan_file'),
                    $this->uploadDestPath . 'file'
                );
            }

            /** Check and remove uploaded summary file */
            if ($request['is_summary_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($screening->summary_file)) {
                    Storage::disk('public')->delete($screening->summary_file);
                }

                $screening->summary_file = '';
            }

            /** Upload summary file */
            if ($request->file('summary_file')) {
                $screening->summary_file = $this->fileService->uploadFile(
                    $request->file('summary_file'),
                    $this->uploadDestPath . 'file'
                );
            }

            if ($screening->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Updating successfully!!',
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

    public function destroy($id) 
    {
        try {
            $screening = ProactiveScreening::find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($screening->plan_file)) {
                Storage::disk('public')->delete($screening->plan_file);
            }

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($screening->summary_file)) {
                Storage::disk('public')->delete($screening->summary_file);
            }

            if ($screening->delete()) {
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
