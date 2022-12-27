<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pname;

class PnameController extends Controller
{
    public function getPnames(Request $request)
    {
        $pnames = Pname::orderBy('provis_code')->get();

        return response()->json($pnames);
    }
}
