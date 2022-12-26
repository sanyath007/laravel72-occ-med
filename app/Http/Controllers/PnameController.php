<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pname;

class PnameController extends Controller
{
    public function getPnames(Request $request)
    {
        $pnames = Pname::all();

        return response()->json($pnames);
    }
}
