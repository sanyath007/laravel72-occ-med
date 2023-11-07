<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Investigation;
use App\Models\InvestigationType;

class InvestigationController extends Controller
{
    public function search(Request $request)
    {
        $investigations = Investigation::with('type','division')->paginate(10);

        return response()->json($investigations);
    }

    public function getById($id)
    {
        $investigation = Investigation::with('type','division')->find($id);

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
            $investigation->file_attachment     = $request['file_attachment'];
            $investigation->pic_attachment      = $request['pic_attachment'];
            $investigation->is_return_data      = $request['is_return_data'];
            // $investigation->remark = $request['remark'];

            /** Upload file and pictures */
            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/investigation/file/';

                if ($file->move($destinationPath, $fileName)) {
                    $investigation->file_attachment = $fileName;
                }
            }

            if ($request->file('pic_attachment')) {
                $file = $request->file('pic_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/investigation/pic/';

                if ($file->move($destinationPath, $fileName)) {
                    $investigation->pic_attachment = $fileName;
                }
            }

            if ($investigation->save()) {
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
            $investigation->file_attachment = $request['file_attachment'];
            $investigation->pic_attachment  = $request['pic_attachment'];
            $investigation->is_return_data  = $request['is_return_data'];
            // $investigation->remark = $request['remark'];

            /** Upload file and pictures */
            if ($request->file('file_attachment')) {
                $file = $request->file('file_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/investigation/file/';

                /** Check and remove uploaded file */
                $existedFile = $destinationPath . $investigation->file_attachment;
                if (\File::exists($existedFile)) {
                    \File::delete($existedFile);
                }

                if ($file->move($destinationPath, $fileName)) {
                    $investigation->file_attachment = $fileName;
                }
            }

            if ($request->file('pic_attachment')) {
                $file = $request->file('pic_attachment');
                $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();
                $destinationPath = 'uploads/investigation/pic/';

                /** Check and remove uploaded picture */
                $existedPic = $destinationPath . $investigation->pic_attachment;
                if (\File::exists($existedPic)) {
                    \File::delete($existedPic);
                }

                if ($file->move($destinationPath, $fileName)) {
                    $investigation->pic_attachment = $fileName;
                }
            }

            if ($investigation->save()) {
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

            /** Remove uploaded file and picture */
            $destinationPath = 'uploads/investigation/';
            $existedFile = $destinationPath .'file/'. $investigation->file_attachment;
            if (\File::exists($existedFile)) {
                \File::delete($existedFile);
            }

            $existedPic = $destinationPath .'pic/'. $investigation->pic_attachment;
            if (\File::exists($existedPic)) {
                \File::delete($existedPic);
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
