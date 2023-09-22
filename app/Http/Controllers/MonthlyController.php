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

        return response()->json($monthlies);
    }

    public function getMonthly($id)
    {
        $monthly = Monthly::with('division','bullets')->find($id);

        return response()->json($monthly);
    }

    public function getMonthlySummary(Request $request, $division, $year)
    {
        $monthlies = \DB::table('monthlies')
                        ->select(
                            'monthlies.year', 'monthly_bullets.bullet_id',
                            \DB::raw('SUM(monthly_bullets.result1) as sum_result1'),
                            \DB::raw('SUM(monthly_bullets.result2) as sum_result2')
                        )
                        ->leftJoin('monthly_bullets', 'monthly_bullets.monthly_id', '=', 'monthlies.id')
                        ->where('division_id', $division)
                        ->where('year', $year)
                        ->groupBy('monthlies.year')
                        ->groupBy('monthly_bullets.bullet_id')
                        ->get();

        $bullets = ReportBullet::where('division_id', $division)
                        ->where('status', 1)
                        ->get();


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
                    $monthlyBullet->bullet_id   = $result['bullet_id'];
                    $monthlyBullet->unit_text   = $result['unit'];
                    $monthlyBullet->result1     = $result['value1'];
                    $monthlyBullet->result2     = $result['value2'];
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
                    if (array_key_exists('id', $result)) {
                        $monthlyBullet = MonthlyBullet::find($result['id']);
                    } else {
                        $monthlyBullet = new MonthlyBullet;
                        $monthlyBullet->monthly_id  = $monthly->id;
                        $monthlyBullet->bullet_id   = $result['bullet_id'];
                        $monthlyBullet->unit_text   = $result['unit'];
                    }

                    $monthlyBullet->result1 = $result['value1'];
                    $monthlyBullet->result2 = $result['value2'];
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

    public function destroy(Request $request, $id)
    {
        try {
            $monthly = Monthly::find($id);

            if ($monthly->delete()) {
                $monthlyBullet = MonthlyBullet::where('monthly_id', $id)->delete();

                return response()->json([
                    "status"    => 1,
                    "message"   => "Deleting successfully"
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
