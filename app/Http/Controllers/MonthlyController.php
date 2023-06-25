<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Monthly;
use App\Models\ReportBullet;

class MonthlyController extends Controller
{
    public function getMonthlies(Request $request)
    {
        $year = $request->get('year');

        $monthlies = Monthly::where('year', $year)->get();
        $bullets = ReportBullet::all();


        return response()->json([
            "monthlies" => $monthlies,
            "bullets"   => $bullets
        ]);
    }

    public function getMonthliesByDivision(Request $request, $division)
    {
        $year = $request->get('year');

        $monthlies = Monthly::where('division_id', $division)
                        ->where('year', $year)
                        ->get();
        $bullets = ReportBullet::where('division_id', $division)->get();


        return response()->json([
            "monthlies" => $monthlies,
            "bullets"   => $bullets
        ]);
    }

    public function getMonthlySummaryByDivision(Request $request, $division, $year)
    {
        $monthlies = \DB::table('monthlies')
                        ->select(
                            'monthlies.year', 'monthlies.report_bullet_id',
                            \DB::raw('SUM(monthlies.result) as sum_result')
                        )
                        ->where('division_id', $division)
                        ->where('year', $year)
                        ->groupBy('monthlies.year')
                        ->groupBy('monthlies.report_bullet_id')
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
                $monthly = new Monthly;
                $monthly->month         = $request['month'];
                $monthly->year          = $request['year'];
                $monthly->division_id   = $request['division_id'];
                $monthly->report_bullet_id  = $result['id'];
                $monthly->unit_text     = $result['unit'];
                $monthly->result        = $result['value'];
                $monthly->save();

                array_push($monthlies, $monthly);
            }

            return response()->json([
                "status"    => 1,
                "message"   => "Insertion successfully",
                "monthlies" => $monthlies
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                "status"    => 0,
                "message"   => $ex->getMessage()
            ]);
        }
    }
}
