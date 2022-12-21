<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Right;
use App\Models\RightType;

class RightController extends Controller
{
    public function getRights(Request $request)
    {
        if (array_key_exists('all', $request->all()) && $request->get('all') == '1') {
            $rights = Right::with('type')->get();
        } else {
            $rights = Right::with('type')->paginate(10);
        }

        return response()->json($rights);
    }

    public function getRight($id)
    {
        $right = Right::find($id)->with('type');

        return response()->json($right);
    }

    public function store(Request $request) {
        return Right::create($request->all());
    }
}
