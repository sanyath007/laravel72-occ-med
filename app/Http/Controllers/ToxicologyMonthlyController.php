<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ToxicologyMonthly;
use App\Models\ReportBullet;

class ToxicologyMonthlyController extends Controller
{
    public function getMonthlies(Request $request)
    {
        $year = $request->get('year');

        $monthlies = ToxicologyMonthly::where('year', $year)->get();
        $bullets = ReportBullet::all();


        return response()->json([
            "monthlies" => $monthlies,
            "bullets"   => $bullets
        ]);
    }

    public function getMonthlySummary(Request $request, $year)
    {
        $monthlies = \DB::table('toxicology_monthly')
                        ->select(
                            'toxicology_monthly.year', 'toxicology_monthly.report_bullet_id',
                            \DB::raw('SUM(toxicology_monthly.result) as sum_result')
                        )
                        ->where('year', $year)
                        ->groupBy('toxicology_monthly.year')
                        ->groupBy('toxicology_monthly.report_bullet_id')
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
                $monthly = new ToxicologyMonthly;
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
