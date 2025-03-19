<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\StdAssessment;
use App\Models\Company;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class StdAssessmentController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/sanitation/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $date = $request->get('date');

        $surveyings = StdAssessment::with('division','company','company.type','galleries')
                        // ->when(!empty($date), function($q) use ($date) {
                        //     $q->where('surver_date', $date);
                        // })
                        ->orderBy('assess_date', 'DESC')
                        ->paginate(10);

        return response()->json($surveyings);
    }

    public function getById($id)
    {
        $surveying = StdAssessment::with('division','company','company.type','galleries')->find($id);

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
            $assessment = new StdAssessment;
            $assessment->assess_date         = $request['assess_date'];
            $assessment->objective_id        = $request['objective_id'];
            $assessment->objective_text      = $request['objective_text'];
            $assessment->division_id         = $request['division_id'];
            $assessment->company_id          = $request['company_id'];
            $assessment->num_of_departs      = $request['num_of_departs'];
            $assessment->num_of_employees    = $request['num_of_employees'];
            $assessment->agency_id           = $request['agency_id'];
            $assessment->agency_text         = $request['agency_text'];
            $assessment->result_id           = $request['result_id'];
            $assessment->result_text         = $request['result_text'];
            $assessment->guuid               = Uuid::uuid4();

            /** Upload file */
            $assessment->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($assessment->save()) {
                /** Insert galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $assessment->guuid;
                        $gallery->save();
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "assessment"    => $assessment
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
            $assessment = StdAssessment::find($id);
            $assessment->assess_date         = $request['assess_date'];
            $assessment->objective_id        = $request['objective_id'];
            $assessment->objective_text      = $request['objective_text'];
            $assessment->division_id         = $request['division_id'];
            $assessment->company_id          = $request['company_id'];
            $assessment->num_of_departs      = $request['num_of_departs'];
            $assessment->num_of_employees    = $request['num_of_employees'];
            $assessment->agency_id           = $request['agency_id'];
            $assessment->agency_text         = $request['agency_text'];
            $assessment->result_id           = $request['result_id'];
            $assessment->result_text         = $request['result_text'];

            /** Check and remove uploaded file */
            if ($request['is_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($assessment->file_attachment)) {
                    Storage::disk('public')->delete($assessment->file_attachment);
                }

                $assessment->file_attachment = '';
            }

            /** Upload file */
            if ($request->file('file_attachment')) {
                $assessment->file_attachment = $this->fileService->uploadFile(
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

            if ($assessment->save()) {
                /** Insert new galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $assessment->guuid;
                        $gallery->save();
                    }
                }

                /** ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่ */
                if ($request['galleries'] && count($request['galleries']) > 0) {
                    foreach($request['galleries'] as $gallery) {
                        if (array_key_exists('removed', $gallery) && $gallery['removed']) {
                             /** Remove physical file */
                            if (Storage::disk('public')->exists($pic['path'])) {
                                Storage::disk('public')->delete($pic['path']);
                            }

                            Gallery::find($gallery['id'])->delete();
                        }
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Updating successfully!!',
                    "assessment"    => $assessment
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
            $assessment = StdAssessment::with('galleries')->find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($assessment->file_attachment)) {
                Storage::disk('public')->delete($assessment->file_attachment);
            }

            if (count($assessment->galleries) > 0) {
                foreach($assessment->galleries as $pic) {
                    if (Storage::disk('public')->exists($pic->path)) {
                        Storage::disk('public')->delete($pic->path);
                    }
                }
            }

            if ($assessment->delete()) {
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
