<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Monthly;
use App\Models\MonthlyBullet;
use App\Models\ReportBullet;

class MonthlyController extends Controller
{
    
    public function getMonthlies(Request $request, $division)
    {
        $year = $request->get('year');

        $monthlies = Monthly::with('division','bullets')
                        ->where('division_id', $division)
                        ->where('year', $year)
                        ->get();
        $bullets = ReportBullet::where('division_id', $division)->get();

        return response()->json([
            "monthlies" => $monthlies,
            "bullets"   => $bullets
        ]);
    }

    public function getMonthly($id)
    {
        $monthly = Monthly::with('division','bullets')->find($id);

        return response()->json($monthly);
    }

    public function getMonthliesByMonth(Request $request, $division, $month)
    {
        $year = $request->get('year');

        $monthly = Monthly::where('division_id', $division)
                        ->where('month', $month)
                        ->where('year', $year)
                        ->get();

        return response()->json($monthly);
    }

    public function getMonthlySummary(Request $request, $division, $year)
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

            $monthly = new Monthly;
            $monthly->month         = $request['month'];
            $monthly->year          = $request['year'];
            $monthly->division_id   = $request['division_id'];

            if ($monthly->save()) {
                foreach($request['results'] as $result) {
                    $monthlyBullet = new MonthlyBullet;
                    $monthlyBullet->monthly_id  = $monthly->id;
                    $monthlyBullet->bullet_id   = $result['id'];
                    $monthlyBullet->unit_text   = $result['unit'];
                    $monthlyBullet->result      = $result['value'];
                    $monthlyBullet->save();
                }

                return response()->json([
                    "status"    => 1,
                    "message"   => "Insertion successfully",
                    "monthlies" => $monthlies
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json([
                "status"    => 0,
                "message"   => $ex->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $monthlies = [];

        try {
            $monthly = Monthly::find($id);
            $monthly->month         = $request['month'];
            $monthly->year          = $request['year'];
            $monthly->division_id   = $request['division_id'];

            if ($monthly->save()) {
                foreach($request['results'] as $result) {
                    $monthlyBullet = MonthlyBullet::find($result['_id']);
                    // $monthlyBullet->monthly_id  = $monthly->id;
                    // $monthlyBullet->bullet_id   = $result['id'];
                    // $monthlyBullet->unit_text   = $result['unit'];
                    $monthlyBullet->result      = $result['value'];
                    $monthlyBullet->save();
                }
    
                return response()->json([
                    "status"    => 1,
                    "message"   => "Updating successfully",
                    "monthlies" => $monthlies
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json([
                "status"    => 0,
                "message"   => $ex->getMessage()
            ]);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $monthly = Monthly::find($id);

            if ($monthly->delete()) {
                return response()->json([
                    "status"    => 1,
                    "message"   => "Deleting successfully",
                    "monthlies" => $monthlies
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json([
                "status"    => 0,
                "message"   => $ex->getMessage()
            ]);
        }
    }
}
