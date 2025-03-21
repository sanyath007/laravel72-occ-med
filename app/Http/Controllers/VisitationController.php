<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Visitation;
use App\Models\SurveyingSurveyor;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class VisitationController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/visitaion/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $visitations = Visitation::with('division','company','visitors','galleries')
                            ->with('visitors.employee','visitors.employee.position','visitors.employee.level')
                            ->orderBy('visit_date', 'DESC')
                            ->paginate(10);

        return response()->json($visitations);
    }

    public function getById($id)
    {
        $visitation = Visitation::with('division','company','visitors','galleries')
                            ->with('visitors.employee','visitors.employee.position','visitors.employee.level')
                            ->find($id);

        return response()->json($visitation);
    }

    public function store(Request $request)
    {
        try {
            $visitation = new Visitation;
            $visitation->visit_date         = $request['visit_date'];
            $visitation->visit_objective    = $request['visit_objective'];
            $visitation->division_id        = $request['division_id'];
            $visitation->company_id         = $request['company_id'];
            $visitation->num_of_patients    = $request['num_of_patients'];
            $visitation->is_returned_data     = $request['is_returned_data'];
            $visitation->guuid               = Uuid::uuid4();

            /** Upload file */
            $visitation->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($visitation->save()) {
                if (count($request['visitors']) > 0) {
                    foreach($request['visitors'] as $visitor) {
                        $newVisitor = new SurveyingSurveyor;
                        $newVisitor->survey_type_id     = 4;
                        $newVisitor->survey_id          = $visitation->id;
                        $newVisitor->employee_id        = $visitor['employee_id'];
                        $newVisitor->save();
                    }
                }

                /** Insert galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $visitation->guuid;
                        $gallery->save();
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "visitation"    => $visitation
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
            $visitation = Visitation::find($id);
            $visitation->visit_date         = $request['visit_date'];
            $visitation->visit_objective    = $request['visit_objective'];
            $visitation->division_id        = $request['division_id'];
            $visitation->company_id         = $request['company_id'];
            $visitation->num_of_patients    = $request['num_of_patients'];
            $visitation->is_returned_data   = $request['is_returned_data'];
            $visitation->guuid              = !empty($visitation->guuid) ? $visitation->guuid : Uuid::uuid4();

            /** Check and remove uploaded file */
            if ($request['is_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($visitation->file_attachment)) {
                    Storage::disk('public')->delete($visitation->file_attachment);
                }

                $visitation->file_attachment = '';
            }

            /** Upload file */
            if ($request->file('file_attachment')) {
                $visitation->file_attachment = $this->fileService->uploadFile(
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

            if ($visitation->save()) {
                if (count($request['visitors']) > 0) {
                    foreach($request['visitors'] as $visitor) {
                        if (array_key_exists('survey_id', $visitor)) {
                            /** 
                             * รายการเดิม
                             * ถ้าเป็นรายการเดิมให้ตรวจสอบว่ามี property flag removed หรือไม่
                             */
                            if (array_key_exists('removed', $visitor) && $visitor['removed']) {
                                SurveyingSurveyor::find($visitor['id'])->delete();
                            }
                        } else {
                            /** รายการใหม่ */
                            $newVisitor = new SurveyingSurveyor;
                            $newVisitor->survey_type_id = 4;
                            $newVisitor->survey_id      = $visitation->id;
                            $newVisitor->employee_id    = $visitor['employee_id'];
                            $newVisitor->save();
                        }
                    }
                }

                /** Insert new galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $visitation->guuid;
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
                    "visitation"    => $visitation
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
            $visitation = Visitation::with('galleries')->find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($visitation->file_attachment)) {
                Storage::disk('public')->delete($visitation->file_attachment);
            }

            if (count($visitation->galleries) > 0) {
                foreach($visitation->galleries as $pic) {
                    if (Storage::disk('public')->exists($pic->path)) {
                        Storage::disk('public')->delete($pic->path);

                        Gallery::find($pic->id)->delete();
                    }
                }
            }

            if ($visitation->delete()) {
                SurveyingSurveyor::where(['survey_id' => $id, 'survey_type_id' => 4])->delete();

                return [
                    'status'        => 1,
                    'message'       => 'Deleting successfully!!',
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
