<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Screening;
use App\Models\CheckupService;
use App\Models\Patient;

class ToxicologyController extends Controller
{
    public function getToxicologies(Request $request)
    {
        $hn = $request->get('hn');
        $company = $request->get('company');

        if (array_key_exists('all', $request->all()) && $request->get('all') == '1') {
            $checkups = Checkup::with('patient','company','right','diag')->get();
        } else {
            $patientsList = Patient::where('hn', $hn)->pluck('id');

            $toxicologies = Service::with('patient','company','right','diag')
                            ->leftJoin('toxicology_services', 'services.id', '=', 'toxicology_services.service_id')
                            ->when(!empty($hn), function($query) use ($patientsList) {
                                $query->where('patient_id', $patientsList);
                            })
                            ->when(!empty($company), function($query) use ($company) {
                                $query->where('company_id', $company);
                            })
                            ->orderBy('service_date', 'desc')
                            ->paginate(10);
        }

        return response()->json($toxicologies);
    }

    public function getToxicology($id)
    {
        $toxicology = Service::find($id)->with('patient','company','right','diag');

        return response()->json($toxicology);
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
                $toxicology = new ToxicologyService;
                $toxicology->service_id            = $service->id;
                $toxicology->working_process       = $request['working_process'];
                $toxicology->working_behavior      = $request['working_behavior'];
                $toxicology->person_behavior       = $request['person_behavior'];
                $toxicology->working_limitation    = $request['working_limitation'];
                $toxicology->abnormal              = $request['abnormal'];
                $toxicology->other                 = $request['other'];
                $toxicology->advice                = $request['advice'];
                $toxicology->health_edu            = $request['health_edu'];
                $toxicology->equipment             = $request['equipment'];
                $toxicology->teaching              = $request['teaching'];
                $toxicology->consulting            = $request['consulting'];
                $toxicology->counseling            = $request['counseling'];
                $toxicology->document              = $request['document'];
                $toxicology->body_checking         = $request['body_checking'];
                $toxicology->save();

                return [
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "toxicology"   => $toxicology
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
                $toxicology = ToxicologyService::where('service_id', $id)->first();
                $toxicology->working_process       = $request['working_process'];
                $toxicology->working_behavior      = $request['working_behavior'];
                $toxicology->person_behavior       = $request['person_behavior'];
                $toxicology->working_limitation    = $request['working_limitation'];
                $toxicology->abnormal              = $request['abnormal'];
                $toxicology->other                 = $request['other'];
                $toxicology->advice                = $request['advice'];
                $toxicology->health_edu            = $request['health_edu'];
                $toxicology->equipment             = $request['equipment'];
                $toxicology->teaching              = $request['teaching'];
                $toxicology->consulting            = $request['consulting'];
                $toxicology->counseling            = $request['counseling'];
                $toxicology->document              = $request['document'];
                $toxicology->body_checking         = $request['body_checking'];
                $toxicology->save();

                return [
                    'status'        => 1,
                    'message'       => 'Updation successfully!!',
                    "toxicology"    => $toxicology
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
