<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

            $checkups = Checkup::with('patient','company','right','diag')
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

    public function store(Request $request) {
        return Checkup::create($request->all());
    }
}
