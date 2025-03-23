<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Guideline;
use App\Services\FileService;

class GuidelineController extends Controller
{
    protected $fileService;

    protected $uploadDestPath = 'uploads/guideline/';

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function search(Request $request)
    {
        $guidelines = Guideline::with('division')->orderBy('created_at', 'DESC')->paginate(10);

        return response()->json($guidelines);
    }

    public function getById($id)
    {
        $guideline = Guideline::with('division')->find($id);

        return response()->json($guideline);
    }

    public function store(Request $request)
    {
        try {
            $guideline = new Guideline;
            $guideline->topic = $request['topic'];
            $guideline->division_id = $request['division_id'];
            $guideline->remark = $request['remark'];

            /** Upload file */
            $guideline->file_attachment = $this->fileService->uploadFile(
                $request->file('file_attachment'),
                $this->uploadDestPath . 'file'
            );

            if ($guideline->save()) {
                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "guideline"     => $guideline
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
            $guideline = Guideline::find($id);
            $guideline->topic = $request['topic'];
            $guideline->division_id = $request['division_id'];
            $guideline->remark = $request['remark'];

            /** Check and remove uploaded file */
            if ($request['is_file_updated'] == 'true') {
                if (Storage::disk('public')->exists($guideline->file_attachment)) {
                    Storage::disk('public')->delete($guideline->file_attachment);
                }

                $guideline->file_attachment = '';
            }

            /** Upload file */
            if ($request->file('file_attachment')) {
                $guideline->file_attachment = $this->fileService->uploadFile(
                    $request->file('file_attachment'),
                    $this->uploadDestPath . 'file'
                );
            }

            if ($guideline->save()) {
                return [
                    'status'        => 1,
                    'message'       => 'Updating successfully!!',
                    "guideline"     => $guideline
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
            $guideline = Guideline::find($id);

            /** Remove uploaded file */
            if (Storage::disk('public')->exists($guideline->file_attachment)) {
                Storage::disk('public')->delete($guideline->file_attachment);
            }

            if ($guideline->delete()) {
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
