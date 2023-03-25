<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Screening;
use App\Models\CheckupService;
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
                            ->leftJoin('checkup_services', 'services.id', '=', 'checkup_services.service_id')
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
        $checkups = Service::find($id)->with('patient','company','right','diag');

        return response()->json($checkups);
    }

    public function store(Request $request)
    {
        try {
            /** Service data */
            $service = new Service;
            $service->patient_id        = $request['patient_id'];
            $service->service_date      = $request['service_date'];
            $service->service_time      = $request['service_time'];
            $service->service_point     = $request['service_point'];
            $service->service_type_id   = $request['service_type_id'];
            $service->age_y             = $request['age_y'];
            $service->age_m             = $request['age_m'];
            $service->right_id          = $request['right_id'];
            $service->company_id        = $request['company_id'];
            $service->is_officer        = $request['is_officer'];
            $service->weight            = $request['weight'];
            $service->height            = $request['height'];
            $service->bmi               = $request['bmi'];
            $service->waist             = $request['waist'];
            $service->bpd               = $request['bpd'];
            $service->bps               = $request['bps'];
            $service->dtx               = $request['dtx'];
            $service->no_food           = $request['no_food'];
            $service->smoking           = $request['smoking'];
            $service->drinking          = $request['drinking'];
            $service->vision            = $request['vision'];
            $service->hearing           = $request['hearing'];
            $service->lung              = $request['lung'];
            $service->body              = $request['body'];
            $service->heart_wave        = $request['heart_wave'];
            $service->pdx               = $request['pdx'];
            $service->net_total         = $request['net_total'];
            $service->screen_user       = $request['screen_user'];
            $service->doctor_id         = $request['doctor_id'];
            $service->remark            = $request['remark'];

            if ($service->save()) {
                /** Checkuo data */
                $checkup = new CheckupService;
                $checkup->service_id = $service->id;
                $checkup->lab_result = $request['lab_result'];
                $checkup->equip_result = $request['equip_result'];
                $checkup->xray_result = $request['xray_result'];
                $checkup->screening = $request['screening'];
                $checkup->health_edu = $request['health_edu'];
                $checkup->reported = $request['reported'];
                $checkup->specialist = $request['specialist'];
                $checkup->summary_result = $request['summary_result'];
                $checkup->save();

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
            /** Service data */
            $service = Service::find($id);
            $service->patient_id = $request['patient_id'];
            $service->service_date = $request['service_date'];
            $service->service_time = $request['service_time'];
            $service->is_officer = $request['is_officer'];
            $service->company_id = $request['company_id'];
            $service->right_id = $request['right_id'];
            $service->doctor_id = $request['doctor_id'];
            $service->age_y = $request['age_y'];
            $service->age_m = $request['age_m'];

            /** Screening data */
            $service->weight = $request['weight'];
            $service->height = $request['height'];
            $service->bmi = $request['bmi'];
            $service->waist = $request['waist'];
            $service->bpd = $request['bpd'];
            $service->bps = $request['bps'];
            $service->dtx = $request['dtx'];
            $service->no_food = $request['no_food'];
            $service->smoking = $request['smoking'];
            $service->drinking = $request['drinking'];
            $service->vision = $request['vision'];
            $service->hearing = $request['hearing'];
            $service->lung = $request['lung'];
            $service->body = $request['body'];
            $service->heart_wave = $request['heart_wave'];
            $service->pdx = $request['pdx'];
            $service->net_total = $request['net_total'];
            $service->remark = $request['remark'];
            $service->screen_user = $request['screen_user'];

            if ($checkup->save()) {
                /** Checkup data */
                $checkup = CheckupService::where('service_id', $id)->first();
                $checkup->lab_result = $request['lab_result'];
                $checkup->equip_result = $request['equip_result'];
                $checkup->xray_result = $request['xray_result'];
                $checkup->screening = $request['screening'];
                $checkup->health_edu = $request['health_edu'];
                $checkup->reported = $request['reported'];
                $checkup->specialist = $request['specialist'];
                $checkup->summary_result = $request['summary_result'];
                $checkup->save();

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
            $checkup = CheckupService::find($id);

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
