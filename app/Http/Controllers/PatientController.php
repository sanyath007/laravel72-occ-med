<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    public function getPatients(Request $request)
    {
        $hn = $request->get('hn');
        $name = $request->get('name');

        $patients = Patient::with('tambon','amphur','changwat','bloodGroup')
                            ->with('right','hospMain','nationality','company')
                            ->when(!empty($hn), function($query) use ($hn) {
                                $query->where('hn', 'like', $hn.'%');
                            })
                            ->when(!empty($name), function($query) use ($name) {
                                list($fname, $lname) = explode('-', $name);

                                $query->where(function($sub) use ($fname, $lname) {
                                    $sub->when(!empty($fname), function($q) use ($fname) {
                                        $q->where('fname', 'like', $fname.'%');
                                    });

                                    $sub->when(!empty($lname), function($q) use ($lname) {
                                        $q->Where('lname', 'like', $lname.'%');
                                    });
                                });
                            })
                            ->paginate(10);

        return response()->json($patients);
    }

    public function getPatient($id)
    {
        $patient = Patient::with('tambon','amphur','changwat')
                        ->with('right','nationality')
                        ->find($id);

        return response()->json($patient);
    }

    public function store(Request $request) {
        try {
            $patient = new Patient;
            $patient->hn        = $request['hn'];
            $patient->cid       = $request['cid'];
            $patient->pname     = $request['pname'];
            $patient->fname     = $request['fname'];
            $patient->lname     = $request['lname'];
            $patient->sex       = $request['sex'];
            $patient->birthdate = $request['birthdate'];
            $patient->tel1      = $request['tel1'];
            $patient->tel2      = $request['tel2'];
            $patient->address   = $request['address'];
            $patient->moo       = $request['moo'];
            $patient->road      = $request['road'];
            $patient->tambon_id = $request['tambon_id'];
            $patient->amphur_id = $request['amphur_id'];
            $patient->changwat_id    = $request['changwat_id'];
            $patient->zipcode        = $request['zipcode'];
            $patient->nationality_id = $request['nationality_id'];
            $patient->right_id       = $request['right_id'];
            $patient->blood_group_id = $request['blood_group_id'];

            if ($patient->save()) {
                return response()->json([
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "patient"   => $patient
                ]);
            } else {
                return response()->json([
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json([
                'status'    => 0,
                'message'   => $ex->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id) {
        try {
            $patient = Patient::find($id);
            $patient->hn        = $request['hn'];
            $patient->cid       = $request['cid'];
            $patient->pname     = $request['pname'];
            $patient->fname     = $request['fname'];
            $patient->lname     = $request['lname'];
            $patient->sex       = $request['sex'];
            $patient->birthdate = $request['birthdate'];
            $patient->tel1      = $request['tel1'];
            $patient->tel2      = $request['tel2'];
            $patient->address   = $request['address'];
            $patient->moo       = $request['moo'];
            $patient->road      = $request['road'];
            $patient->tambon_id = $request['tambon_id'];
            $patient->amphur_id = $request['amphur_id'];
            $patient->changwat_id    = $request['changwat_id'];
            $patient->zipcode        = $request['zipcode'];
            $patient->nationality_id = $request['nationality_id'];
            $patient->right_id       = $request['right_id'];
            $patient->blood_group_id = $request['blood_group_id'];

            if ($patient->save()) {
                return response()->json([
                    'status'    => 1,
                    'message'   => 'Updating successfully!!',
                    "patient"   => $patient
                ]);
            } else {
                return response()->json([
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json([
                'status'    => 0,
                'message'   => $ex->getMessage()
            ]);
        }
    }
}
