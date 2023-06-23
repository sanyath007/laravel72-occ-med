<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OccupationMonthly;
use App\Models\ReportBullet;

class OccupationMonthlyController extends Controller
{
    public function getMonthlies(Request $request)
    {
        $year = $request->get('year');

        $monthlies = OccupationMonthly::where('year', $year)->get();
        $bullets = ReportBullet::all();


        return response()->json([
            "monthlies" => $monthlies,
            "bullets"   => $bullets
        ]);
    }

    public function getMonthlySummary(Request $request, $year)
    {
        $monthlies = \DB::table('occupation_monthly')
                        ->select(
                            'occupation_monthly.year', 'occupation_monthly.report_bullet_id',
                            \DB::raw('SUM(occupation_monthly.result) as sum_result')
                        )
                        ->where('year', $year)
                        ->groupBy('occupation_monthly.year')
                        ->groupBy('occupation_monthly.report_bullet_id')
                        ->get();
        $bullets = ReportBullet::all();


        return response()->json([
            "monthlies" => $monthlies,
            "bullets"   => $bullets
        ]);
    }

    public function store(Request $request)
    {
        try {
            $monthlies = [];

            foreach($request['results'] as $result) {
                $monthly = new OccupationMonthly;
                $monthly->month         = $request['month'];
                $monthly->year          = $request['year'];
                $monthly->report_bullet_id  = $result['id'];
                $monthly->unit_text     = $result['unit'];
                $monthly->result        = $result['value'];
                $monthly->save();

                array_push($monthlies, $monthly);
            }

            return response()->json($monthlies);
        } catch (\Exception $ex) {
            return response()->json([
                "status"    => 0,
                "message"   => $ex->getMessage()
            ]);
        }
    }
}
