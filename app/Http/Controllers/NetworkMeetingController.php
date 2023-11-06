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
        $meeting = NetworkMeeting::with('division')->find($id);

        return response()->json($meeting);
    }

    public function store(Request $request) {
        try {
            $meeting = new NetworkMeeting;
            $meeting->meeting_date = $request['meeting_date'];
            $meeting->meeting_objective = $request['meeting_objective'];
            $meeting->division_id = $request['division_id'];
            $meeting->meeting_type_id = $request['meeting_type_id'];
            $meeting->meeting_type_text = $request['meeting_type_text'];
            $meeting->target_group_id = $request['target_group_id'];
            $meeting->attendee = $request['attendee'];
            $meeting->period = $request['period'];
            $meeting->period_unit = $request['period_unit'];
            // $meeting->remark = $request['remark'];

            if ($meeting->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "meeting"   => $meeting
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
            $meeting = NetworkMeeting::find($id);
            $meeting->meeting_date = $request['meeting_date'];
            $meeting->meeting_objective = $request['meeting_objective'];
            $meeting->division_id = $request['division_id'];
            $meeting->meeting_type_id = $request['meeting_type_id'];
            $meeting->meeting_type_text = $request['meeting_type_text'];
            $meeting->target_group_id = $request['target_group_id'];
            $meeting->attendee = $request['attendee'];
            $meeting->period = $request['period'];
            $meeting->period_unit = $request['period_unit'];
            // $meeting->remark = $request['remark'];

            if ($meeting->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Updating successfully!!',
                    "meeting"   => $meeting
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
            $meeting = NetworkMeeting::find($id);

            if ($meeting->delete()) {
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
