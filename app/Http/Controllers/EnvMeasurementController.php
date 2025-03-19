<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\EnvMeasurement;
use App\Models\SurveyingSurveyor;
use App\Models\Company;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class EnvMeasurementController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/env/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $date = $request->get('date');

        $measurements = EnvMeasurement::with('division','company','company.type','surveyors','galleries')
                        ->with('surveyors.employee','surveyors.employee.position','surveyors.employee.level')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->orderBy('measure_date', 'DESC')
                        ->paginate(10);

        return response()->json($measurements);
    }

    public function getById($id)
    {
        $measurement = EnvMeasurement::with('division','company','company.type','surveyors','galleries')
                        ->with('surveyors.employee','surveyors.employee.position','surveyors.employee.level')
                        ->find($id);

        return response()->json($measurement);
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
            $measurement = new EnvMeasurement;
            $measurement->measure_date        = $request['measure_date'];
            $measurement->objective_id        = $request['objective_id'];
            $measurement->objective_text      = $request['objective_text'];
            $measurement->division_id         = $request['division_id'];
            $measurement->company_id          = $request['company_id'];
            $measurement->num_of_departs      = $request['num_of_departs'];
            $measurement->num_of_employees    = $request['num_of_employees'];
            $measurement->job_desc_id         = $request['job_desc_id'];
            $measurement->job_desc_text       = $request['job_desc_text'];
            $measurement->environments        = implode(',', $request['environments']);
            $measurement->other_text          = $request['other_text'];
            $measurement->have_report         = $request['have_report'];
            $measurement->is_returned_data    = $request['is_returned_data'];
            $measurement->guuid               = Uuid::uuid4();

            /** Upload file */
            $measurement->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($measurement->save()) {
                /** Insert surveyors */
                if (count($request['surveyors']) > 0) {
                    foreach($request['surveyors'] as $surveyor) {
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_type_id    = 2;
                        $newSurveyor->survey_id         = $measurement->id;
                        $newSurveyor->employee_id       = $surveyor['employee_id'];
                        $newSurveyor->save();
                    }
                }

                /** Insert galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $measurement->guuid;
                        $gallery->save();
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "measurement"   => $measurement
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
            $measurement = EnvMeasurement::find($id);
            $measurement->measure_date        = $request['measure_date'];
            $measurement->objective_id        = $request['objective_id'];
            $measurement->objective_text      = $request['objective_text'];
            $measurement->division_id         = $request['division_id'];
            $measurement->company_id          = $request['company_id'];
            $measurement->num_of_departs      = $request['num_of_departs'];
            $measurement->num_of_employees    = $request['num_of_employees'];
            $measurement->job_desc_id         = $request['job_desc_id'];
            $measurement->job_desc_text       = $request['job_desc_text'];
            $measurement->environments        = $request['environments'];
            $measurement->other_text          = $request['other_text'];
            $measurement->have_report         = $request['have_report'];
            $measurement->is_returned_data    = $request['is_returned_data'];

            /** Check and remove uploaded file */
            if ($request['is_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($measurement->file_attachment)) {
                    Storage::disk('public')->delete($measurement->file_attachment);
                }

                $measurement->file_attachment = '';
            }

            /** Upload file */
            if ($request->file('file_attachment')) {
                $measurement->file_attachment = $this->fileService->uploadFile(
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

            if ($measurement->save()) {
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
                        $newSurveyor->survey_type_id    = 2;
                        $newSurveyor->survey_id         = $measurement->id;
                        $newSurveyor->employee_id       = $surveyor['employee_id'];
                        $newSurveyor->save();
                    }
                }

                /** Insert new galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $measurement->guuid;
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
                    'status'        => 1,
                    'message'       => 'Updating successfully!!',
                    "measurement"   => $measurement
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
            $measurement = EnvMeasurement::with('galleries')->find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($measurement->file_attachment)) {
                Storage::disk('public')->delete($measurement->file_attachment);
            }

            if (count($measurement->galleries) > 0) {
                foreach($measurement->galleries as $pic) {
                    if (Storage::disk('public')->exists($pic->path)) {
                        Storage::disk('public')->delete($pic->path);
                    }
                }
            }

            if ($measurement->delete()) {
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
