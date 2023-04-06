<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReportBullet;

class ReportBulletController extends Controller
{
    public function getReportBullets(Request $request)
    {
        $bullets = ReportBullet::all();

        return response()->json($bullets);
    }

    public function getReportBulletsByDivision(Request $request, $divId)
    {
        $bullets = ReportBullet::where('division_id', $divId)->get();

        return response()->json($bullets);
    }
}
