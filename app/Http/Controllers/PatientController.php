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
        $patient = Patient::find($id);

        return response()->json($patient);
    }

    public function store(Request $request) {
        return Patient::create($request->all());
    }
}
