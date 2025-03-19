<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EnvMeasurement;
use App\Models\SurveyingSurveyor;
use App\Models\Company;
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

        $measurements = EnvMeasurement::with('division','company','company.type','surveyors')
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
        $measurement = EnvMeasurement::with('division','company','company.type','surveyors')
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
                foreach($pictures as $key => $pic) {
                    $gallery = new Gallery;
                    $gallery->path  = $pic;
                    $gallery->guuid = $measurement->guuid;
                    $gallery->save();
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

            /** Upload file and pictures */
            if ($request->file('file_attachment')) {
                $destinationPath = 'uploads/wts/file/';
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

                /** Check and remove uploaded file */
                $existedFile = $destinationPath . $measurement->file_attachment;
                if (\File::exists($existedFile)) {
                    \File::delete($existedFile);
                }

                if ($file->move($destinationPath, $fileName)) {
                    $measurement->file_attachment = $fileName;
                }
            }

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

            //     $measurement->pic_attachments = $picNames;
            // }

            if ($measurement->save()) {
                if (count($request['surveyors']) > 0) {
                    foreach($request['surveyors'] as $surveyor) {
                        if (array_key_exists('id', $surveyor)) {
                            /** รายการเดิม */
                            if (SurveyingSurveyor::where('employee_id', $surveyor['employee_id'])->count() == 0) {
                                $updatedSurveyor = SurveyingSurveyor::find($surveyor['id']);
                                $updatedSurveyor->employee_id = $surveyor['employee_id'];
                                $updatedSurveyor->save();
                            }
                        } else {
                            /** รายการใหม่ */
                            $newSurveyor = new SurveyingSurveyor;
                            $newSurveyor->survey_id     = $measurement->id;
                            $newSurveyor->employee_id   = $surveyor['employee_id'];
                            $newSurveyor->save();
                        }
                    }
                } else {
                    SurveyingSurveyor::where('survey_id', $id)->delete();
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
            $measurement = EnvMeasurement::find($id);

            /** Remove uploaded file */
            $destinationPath = 'uploads/wts/';
            $existedFile = $destinationPath .'file/'. $measurement->file_attachment;
            if (\File::exists($existedFile)) {
                \File::delete($existedFile);
            }

            if ($measurement->pic_attachments != '') {
                $pictures = explode(',', $measurement->pic_attachments);
                foreach($pictures as $pic) {
                    $existed = $destinationPath .'file/'. $pic;

                    if (\File::exists($existed)) {
                        \File::delete($existed);
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
