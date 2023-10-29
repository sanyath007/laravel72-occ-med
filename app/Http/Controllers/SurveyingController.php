<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surveying;
use App\Models\Company;

class SurveyingController extends Controller
{
    public function search(Request $request)
    {
        $vaccinations = Surveying::with('vaccine','company')->paginate(10);

        return response()->json($vaccinations);
    }

    public function getById($id)
    {
        $vaccination = Surveying::find($id)->with('vaccine','company');

        return response()->json($vaccination);
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

    public function store(Request $request) {
        try {
            $vaccination = new Surveying;
            $vaccination->vaccine_date          = $request['vaccine_date'];
            $vaccination->place                 = $request['place'];
            $vaccination->company_id            = $request['company_id'];
            $vaccination->vaccine_type_id       = $request['vaccine_type_id'];
            $vaccination->vaccine_text          = $request['vaccine_text'];
            $vaccination->target_group_id       = $request['target_group_id'];
            $vaccination->num_of_vaccinated     = $request['num_of_vaccinated'];
            $vaccination->num_of_side_effected  = $request['num_of_side_effected'];
            $vaccination->remark                = $request['remark'];

            if ($vaccination->save()) {
                return [
                    'status'        => 1,
                    'message'       => 'Insertion successfully!!',
                    "vaccination"   => $vaccination
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
