<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReportBullet;

class ReportBulletController extends Controller
{
    public function getReportBullets(Request $request)
    {
        $division = $request->get('division');

        $bullets = ReportBullet::with('division')
                        ->when(!empty($division), function($query) use ($division) {
                            $query->where('division_id', $division);
                        })->paginate(20);

        return response()->json($bullets);
    }

    public function getReportBulletsByDivision(Request $request, $divId)
    {
        $bullets = ReportBullet::where('division_id', $divId)->get();

        return response()->json($bullets);
    }
}
