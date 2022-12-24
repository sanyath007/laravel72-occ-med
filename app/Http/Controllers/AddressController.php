<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Changwat;
use App\Models\Amphur;
use App\Models\Tambon;

class AddressController extends Controller
{
    public function getAddresses(Request $request)
    {
        return [
            "changwats"     => Changwat::all(),
            "amphurs"       => Amphur::all(),
            "tambons"       => Tambon::all(),
        ];
    }
}
