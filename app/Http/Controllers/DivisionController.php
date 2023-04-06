<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
    public function getDivisions(Request $request)
    {
        $divisions = Division::all();

        return response()->json($divisions);
    }
}
