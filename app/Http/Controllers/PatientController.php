<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    public function getPatients()
    {
        return Patient::all();
    }

    public function getPatient($id)
    {
        return Patient::find($id);
    }

    public function store(Request $request) {
        return Patient::create($request->all());
    }
}
