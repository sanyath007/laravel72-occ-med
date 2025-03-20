<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\WTSurveying;
use App\Models\SurveyingSurveyor;
use App\Models\Company;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class WTSurveyingController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/wts/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $date = $request->get('date');

        $surveyings = WTSurveying::with('division','company','company.type','surveyors','galleries')
                        ->with('surveyors.employee','surveyors.employee.position','surveyors.employee.level')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->orderBy('survey_date', 'DESC')
                        ->paginate(10);

        return response()->json($surveyings);
    }

    public function getById($id)
    {
        $surveying = WTSurveying::with('division','company','company.type','surveyors','galleries')
                        ->with('surveyors.employee','surveyors.employee.position','surveyors.employee.level')
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
            $surveying = new WTSurveying;
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
            $surveying->guidelines          = !empty($request['guidelines']) ? implode(',', $request['guidelines']) : '';
            $surveying->remark              = $request['remark'];
            $surveying->guuid               = Uuid::uuid4();

            /** Upload file */
            $surveying->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($surveying->save()) {
                /** Insert surveyors */
                if (count($request['surveyors']) > 0) {
                    foreach($request['surveyors'] as $surveyor) {
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_type_id    = 1;
                        $newSurveyor->survey_id         = $surveying->id;
                        $newSurveyor->employee_id       = $surveyor['employee_id'];
                        $newSurveyor->save();
                    }
                }

                /** Insert galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $surveying->guuid;
                        $gallery->save();
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
            $surveying = WTSurveying::find($id);
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
            $surveying->guidelines          = !empty($request['guidelines']) ? implode(',', $request['guidelines']) : '';
            $surveying->remark              = $request['remark'];

            /** Check and remove uploaded file */
            if ($request['is_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($surveying->file_attachment)) {
                    Storage::disk('public')->delete($surveying->file_attachment);
                }

                $surveying->file_attachment = '';
            }

            /** Upload file */
            if ($request->file('file_attachment')) {
                $surveying->file_attachment = $this->fileService->uploadFile(
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

            if ($surveying->save()) {
                foreach($request['surveyors'] as $surveyor) {
                    if (array_key_exists('survey_id', $surveyor)) {
                        /** 
                         * รายการเดิม
                         * ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่
                         */
                        if (array_key_exists('removed', $surveyor) && $surveyor['removed']) {
                            SurveyingSurveyor::find($surveyor['id'])->delete();
                        }
                    } else {
                        /** รายการใหม่ */
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_type_id    = 1;
                        $newSurveyor->survey_id         = $surveying->id;
                        $newSurveyor->employee_id       = $surveyor['employee_id'];
                        $newSurveyor->save();
                    }
                }

                /** Insert new galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $surveying->guuid;
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
            $surveying = WTSurveying::with('galleries')->find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($surveying->file_attachment)) {
                Storage::disk('public')->delete($surveying->file_attachment);
            }

            if (count($surveying->galleries) > 0) {
                foreach($surveying->galleries as $pic) {
                    if (Storage::disk('public')->exists($pic->path)) {
                        Storage::disk('public')->delete($pic->path);

                        Gallery::find($pic->id)->delete();
                    }
                }
            }

            if ($surveying->delete()) {
                SurveyingSurveyor::where(['survey_id' => $id, 'survey_type_id' => 3])->delete();

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
