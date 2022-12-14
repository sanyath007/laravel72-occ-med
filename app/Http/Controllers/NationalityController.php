<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nationality;

class NationalityController extends Controller
{
    public function getNationalities(Request $request)
    {
        $code   = $request->get('code');
        $name   = $request->get('name');

        if (array_key_exists('all', $request->all()) && $request->get('all') == '1') {
            $nationalities = Nationality::orderBy('nhso_code')->get();
        } else {
            $nationalities = Nationality::when(!empty($code), function($query) use ($code) {
                                    $query->where('code', $code);
                                })
                                ->when(!empty($name), function($query) use ($name) {
                                    $query->where('name', 'like', '%'.$name.'%');
                                })
                                ->paginate(10);
        }

        return response()->json($nationalities);
    }

    public function getNationality($id)
    {
        $nationality = Nationality::find($id);

        return response()->json($nationality);
    }
}
