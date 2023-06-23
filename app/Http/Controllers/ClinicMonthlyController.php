<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClinicMonthly;
use App\Models\ReportBullet;

class ClinicMonthlyController extends Controller
{
    public function getMonthlies(Request $request)
    {
        $year = $request->get('year');

        $monthlies = ClinicMonthly::where('year', $year)->get();
        $bullets = ReportBullet::all();


        return response()->json([
            "monthlies" => $monthlies,
            "bullets"   => $bullets
        ]);
    }

    public function getMonthlySummary(Request $request, $year)
    {
        $monthlies = \DB::table('clinic_monthly')
                        ->select(
                            'clinic_monthly.year', 'clinic_monthly.report_bullet_id',
                            \DB::raw('SUM(clinic_monthly.result) as sum_result')
                        )
                        ->where('year', $year)
                        ->groupBy('clinic_monthly.year')
                        ->groupBy('clinic_monthly.report_bullet_id')
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
                $monthly = new ClinicMonthly;
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
