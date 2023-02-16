<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Checkup;
use App\Models\Patient;

class CheckupController extends Controller
{
    public function getCheckups(Request $request)
    {
        $hn = $request->get('hn');
        $company = $request->get('company');

        if (array_key_exists('all', $request->all()) && $request->get('all') == '1') {
            $checkups = Checkup::with('patient','company','right','diag')->get();
        } else {
            $patientsList = Patient::where('hn', $hn)->pluck('id');

            $checkups = Service::with('patient','company','right','diag')
                            ->leftJoin('checkups', 'services.id', '=', 'checkups.service_id')
                            ->when(!empty($hn), function($query) use ($patientsList) {
                                $query->where('patient_id', $patientsList);
                            })
                            ->when(!empty($company), function($query) use ($company) {
                                $query->where('company_id', $company);
                            })
                            ->paginate(10);
        }

        return response()->json($checkups);
    }

    public function getCheckup($id)
    {
        $checkups = Checkup::find($id)->with('patient','company','right','diag');

        return response()->json($checkups);
    }

    public function store(Request $request)
    {
        try {
            $checkup = new Checkup;
            $checkup->patient_id = $request['patient_id'];
            $checkup->visit_date = $request['visit_date'];
            $checkup->visit_time = $request['visit_time'];
            $checkup->is_officer = $request['is_officer'];
            $checkup->company_id = $request['company_id'];
            $checkup->age_y = $request['age_y'];
            $checkup->age_m = $request['age_m'];
            $checkup->lab_result = $request['lab_result'];
            $checkup->equip_result = $request['equip_result'];
            $checkup->xray_result = $request['xray_result'];
            $checkup->screening = $request['screening'];
            $checkup->health_edu = $request['health_edu'];
            $checkup->reported = $request['reported'];
            $checkup->specialist = $request['specialist'];
            $checkup->summary_result = $request['summary_result'];
            $checkup->pdx = $request['pdx'];
            $checkup->net_total = $request['net_total'];
            $checkup->right_id = $request['right_id'];
            $checkup->remark = $request['remark'];

            if ($checkup->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "checkup"   => $checkup
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
            $checkup = Checkup::find($id);
            $checkup->patient_id = $request['patient_id'];
            $checkup->visit_date = $request['visit_date'];
            $checkup->visit_time = $request['visit_time'];
            $checkup->is_officer = $request['is_officer'];
            $checkup->company_id = $request['company_id'];
            $checkup->age_y = $request['age_y'];
            $checkup->age_m = $request['age_m'];
            $checkup->lab_result = $request['lab_result'];
            $checkup->equip_result = $request['equip_result'];
            $checkup->xray_result = $request['xray_result'];
            $checkup->screening = $request['screening'];
            $checkup->health_edu = $request['health_edu'];
            $checkup->reported = $request['reported'];
            $checkup->specialist = $request['specialist'];
            $checkup->summary_result = $request['summary_result'];
            $checkup->pdx = $request['pdx'];
            $checkup->net_total = $request['net_total'];
            $checkup->right_id = $request['right_id'];
            $checkup->remark = $request['remark'];

            if ($checkup->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Updation successfully!!',
                    "checkup"   => $checkup
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

    public function delete(Request $request, $id)
    {
        try {
            $checkup = Checkup::find($id);

            if ($checkup->delete()) {
                return [
                    'status'    => 1,
                    'message'   => 'Deletion successfully!!'
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
