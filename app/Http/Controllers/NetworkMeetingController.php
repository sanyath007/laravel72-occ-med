<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NetworkMeeting;
// use App\Models\NetworkMeetingType;

class NetworkMeetingController extends Controller
{
    public function search(Request $request)
    {
        $meetings = NetworkMeeting::with('division')->paginate(10);

        return response()->json($meetings);
    }

    public function getById($id)
    {
        $meeting = NetworkMeeting::find($id)->with('division');

        return response()->json($meeting);
    }

    public function store(Request $request) {
        try {
            $meeting = new NetworkMeeting;
            $meeting->investigate_date = $request['investigate_date'];
            $meeting->investigate_objective = $request['investigate_objective'];
            $meeting->investigate_type_id = $request['investigate_type_id'];
            $meeting->is_working_disease = $request['is_working_disease'];
            $meeting->is_investigate = $request['is_investigate'];
            $meeting->division_id = $request['division_id'];
            $meeting->investigate_place = $request['investigate_place'];
            $meeting->num_of_people = $request['num_of_people'];
            $meeting->file_attachment = $request['file_attachment'];
            $meeting->pic_attachment = $request['pic_attachment'];
            $meeting->is_return_data = $request['is_return_data'];
            // $meeting->remark = $request['remark'];

            if ($meeting->save()) {
                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "meeting" => $meeting
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
