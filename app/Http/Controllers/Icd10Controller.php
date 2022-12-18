<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Icd10;
use App\Models\Student;
use App\Models\Subject;

class Icd10Controller extends Controller
{
    public function getIcd10s(Request $request)
    {
        $code   = $request->get('code');
        $name   = $request->get('name');

        $icd10s = Icd10::when(!empty($code), function($query) use ($code) {
                            $query->where('code', 'like', $code.'%');
                        })
                        ->when(!empty($name), function($query) use ($name) {
                            $query->where('name', 'like', '%'.$name.'%');
                        })
                        ->paginate(10);

        return [
            "icd10s" => $icd10s
        ];
    }
}
