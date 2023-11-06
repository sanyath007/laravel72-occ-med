<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guideline;

class GuidelineController extends Controller
{
    public function search(Request $request)
    {
        $guidelines = Guideline::with('division')->paginate(10);

        return response()->json($guidelines);
    }

    public function getById($id)
    {
        $guideline = Guideline::with('division')->find($id);

        return response()->json($guideline);
    }

    public function store(Request $request) {
        try {
            $guideline = new Guideline;
            $guideline->topic = $request['topic'];
            $guideline->division_id = $request['division_id'];
            $guideline->remark = $request['remark'];

            /** Upload file */
            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/guideline/';

                if ($file->move($destinationPath, $fileName)) {
                    $guideline->file_attachment = $fileName;
                }
            }

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

    public function update(Request $request, $id) {
        try {
            $guideline = Guideline::find($id);
            $guideline->topic = $request['topic'];
            $guideline->division_id = $request['division_id'];
            $guideline->remark = $request['remark'];

            /** Upload file and pictures */
            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/guideline/';

                /** Check and remove uploaded file */
                $existedFile = $destinationPath . $guideline->file_attachment;
                if (\File::exists($existedFile)) {
                    \File::delete($existedFile);
                }

                if ($file->move($destinationPath, $fileName)) {
                    $guideline->file_attachment = $fileName;
                }
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

    public function destroy($id) {
        try {
            $guideline = Guideline::find($id);

            /** Remove uploaded file */
            $destinationPath = 'uploads/wts';
            $existedFile = $destinationPath .'/file/'. $surveying->file_attachment;
            if (\File::exists($existedFile)) {
                \File::delete($existedFile);
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
