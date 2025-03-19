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
            // $assessment->remark              = $request['remark'];
            /** Upload file */
            $assessment->file_attachment = $this->fileService->uploadFile($request->file('file_attachment'), 'uploads/sanitation/file');
            /** Upload pictures */
            $assessment->pic_attachments = $this->fileService->uploadMultipleImages($request->file('pic_attachments'), 'uploads/sanitation/pic');

            if ($assessment->save()) {
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
            // $assessment->remark              = $request['remark'];

            /** Upload file and pictures */
            if ($request->file('file_attachment')) {
                $destinationPath = 'uploads/sanitation/file/';
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

                /** Check and remove uploaded file */
                $existedFile = $destinationPath . $assessment->file_attachment;
                if (\File::exists($existedFile)) {
                    \File::delete($existedFile);
                }

                if ($file->move($destinationPath, $fileName)) {
                    $assessment->file_attachment = $fileName;
                }
            }

            // if ($request->file('pic_attachments')) {
            //     $index = 0;
            //     $picNames = '';
            //     $destinationPath = 'uploads/sanitation/pic/';

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

            //     $assessment->pic_attachments = $picNames;
            // }

            if ($assessment->save()) {
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
            $assessment = StdAssessment::find($id);

            /** Remove uploaded file */
            $destinationPath = 'uploads/sanitation/';
            $existedFile = $destinationPath .'file/'. $assessment->file_attachment;
            if (\File::exists($existedFile)) {
                \File::delete($existedFile);
            }

            if ($assessment->pic_attachments != '') {
                $pictures = explode(',', $assessment->pic_attachments);
                foreach($pictures as $pic) {
                    $existed = $destinationPath .'file/'. $pic;

                    if (\File::exists($existed)) {
                        \File::delete($existed);
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
