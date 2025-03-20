<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\ProblemSurveying;
use App\Models\SurveyingSurveyor;
use App\Models\Company;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class ProblemSurveyingController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/occupation/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $date = $request->get('date');

        $surveyings = ProblemSurveying::with('division','company','company.type','surveyors','galleries')
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
        $surveying = ProblemSurveying::with('division','company','company.type','surveyors','galleries')
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
            $surveying = new ProblemSurveying;
            $surveying->survey_date         = $request['survey_date'];
            $surveying->objective_id        = $request['objective_id'];
            $surveying->objective_text      = $request['objective_text'];
            $surveying->division_id         = $request['division_id'];
            $surveying->company_id          = $request['company_id'];
            $surveying->source_id           = $request['source_id'];
            $surveying->source_text         = $request['source_text'];
            $surveying->problem_text        = $request['problem_text'];
            $surveying->cause_id            = $request['cause_id'];
            $surveying->cause_text          = $request['cause_text'];
            $surveying->solution_id         = $request['solution_id'];
            $surveying->solution_text       = $request['solution_text'];
            $surveying->guuid               = Uuid::uuid4();

            /** Upload file */
            $surveying->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            // /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($surveying->save()) {
                /** Insert surveyors */
                if (count($request['surveyors']) > 0) {
                    foreach($request['surveyors'] as $surveyor) {
                        $newSurveyor = new SurveyingSurveyor;
                        $newSurveyor->survey_type_id    = 3;
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
            $surveying = ProblemSurveying::find($id);
            $surveying->survey_date     = $request['survey_date'];
            $surveying->objective_id    = $request['objective_id'];
            $surveying->objective_text  = $request['objective_text'];
            $surveying->division_id     = $request['division_id'];
            $surveying->company_id      = $request['company_id'];
            $surveying->source_id       = $request['source_id'];
            $surveying->source_text     = $request['source_text'];
            $surveying->problem_text    = $request['problem_text'];
            $surveying->cause_id        = $request['cause_id'];
            $surveying->cause_text      = $request['cause_text'];
            $surveying->solution_id     = $request['solution_id'];
            $surveying->solution_text   = $request['solution_text'];
            $surveying->guuid           = empty($surveying->guuid) ? Uuid::uuid4() : $surveying->guuid;

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
                        $newSurveyor->survey_type_id    = 3;
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
            $surveying = ProblemSurveying::with('galleries')->find($id);

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
