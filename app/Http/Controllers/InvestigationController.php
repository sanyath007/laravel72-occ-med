<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Investigation;
use App\Models\InvestigationType;
use App\Models\Gallery;
use App\Services\FileService;
use Ramsey\Uuid\Uuid;

class InvestigationController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/investigation/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $investigations = Investigation::with('type','division','galleries')
                                        ->orderBy('invest_date', 'DESC')
                                        ->paginate(10);

        return response()->json($investigations);
    }

    public function getById($id)
    {
        $investigation = Investigation::with('type','division','galleries')->find($id);

        return response()->json($investigation);
    }

    public function store(Request $request) {
        try {
            $investigation = new Investigation;
            $investigation->invest_date         = $request['invest_date'];
            $investigation->objective           = $request['objective'];
            $investigation->invest_type_id      = $request['invest_type_id'];
            $investigation->is_working_disease  = $request['is_working_disease'];
            $investigation->is_investigate      = $request['is_investigate'];
            $investigation->division_id         = $request['division_id'];
            $investigation->place               = $request['place'];
            $investigation->num_of_people       = $request['num_of_people'];
            $investigation->is_return_data      = $request['is_return_data'];
            $investigation->guuid               = Uuid::uuid4();

            /** Upload file */
            $investigation->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            /** Upload pictures */
            $pictures = $this->fileService->uploadMultipleImages(
                $request->file('pictures'),
                $this->uploadDestPath . 'pic'
            );

            if ($investigation->save()) {
                /** Insert galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $investigation->guuid;
                        $gallery->save();
                    }
                }

                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "investigation" => $investigation
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

    public function update(Request $request, $id) {
        try {
            $investigation = Investigation::find($id);
            $investigation->invest_date     = $request['invest_date'];
            $investigation->objective       = $request['objective'];
            $investigation->invest_type_id  = $request['invest_type_id'];
            $investigation->is_working_disease = $request['is_working_disease'];
            $investigation->is_investigate  = $request['is_investigate'];
            $investigation->division_id     = $request['division_id'];
            $investigation->place           = $request['place'];
            $investigation->num_of_people   = $request['num_of_people'];
            $investigation->is_return_data  = $request['is_return_data'];
            $investigation->guuid           = empty($investigation->guuid) ? Uuid::uuid4() : $investigation->guuid;

            /** Check and remove uploaded file */
            if ($request['is_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($investigation->file_attachment)) {
                    Storage::disk('public')->delete($investigation->file_attachment);
                }

                $investigation->file_attachment = '';
            }

            /** Upload file */
            if ($request->file('file_attachment')) {
                $investigation->file_attachment = $this->fileService->uploadFile(
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

            if ($investigation->save()) {
                /** Insert new galleries */
                if (count($pictures) > 0) {
                    foreach($pictures as $key => $pic) {
                        $gallery = new Gallery;
                        $gallery->path  = $pic;
                        $gallery->guuid = $investigation->guuid;
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
                    "investigation" => $investigation
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

    public function destroy($id) {
        try {
            $investigation = Investigation::find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($investigation->file_attachment)) {
                Storage::disk('public')->delete($investigation->file_attachment);
            }

            if (count($investigation->galleries) > 0) {
                foreach($investigation->galleries as $pic) {
                    if (Storage::disk('public')->exists($pic->path)) {
                        Storage::disk('public')->delete($pic->path);

                        Gallery::find($pic->id)->delete();
                    }
                }
            }

            if ($investigation->delete()) {
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
