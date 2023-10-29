<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vaccination;
use App\Models\Vaccine;
use App\Models\Company;

class VaccinationController extends Controller
{
    public function search(Request $request)
    {
        $vaccinations = Vaccination::with('vaccine','company')->paginate(10);

        return response()->json($vaccinations);
    }

    public function getById($id)
    {
        $vaccination = Vaccination::find($id)->with('vaccine','company');

        return response()->json($vaccination);
    }

    public function getInitialFormData()
    {
        return [
            
        ];
    }

    public function store(Request $request) {
        try {
            $vaccination = new Vaccination;
            $vaccination->vaccine_date = $request['visit_date'];
            $vaccination->place = $request['place'];
            $vaccination->company_id = $request['company_id'];
            $vaccination->vaccine_type_id = $request['vaccine_type_id'];
            $vaccination->vaccine_text = $request['vaccine_text'];
            $vaccination->target_group_id = $request['target_group_id'];
            $vaccination->num_of_vaccinated = $request['num_of_vaccinated'];
            $vaccination->num_of_side_effected = $request['num_of_side_effected'];
            $vaccination->remark = $request['remark'];

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