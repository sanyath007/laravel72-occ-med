<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReportBullet;

class ReportBulletController extends Controller
{
    public function getReportBullets(Request $request)
    {
        $division = $request->get('division');
        $name = $request->get('name');
        $types = strpos($request->get('type'), ',') != false
                    ? explode(',', $request->get('type'))
                    : $request->get('type');

        $bullets = ReportBullet::with('division')
                        ->when(!empty($division), function($query) use ($division) {
                            $query->where('division_id', $division);
                        })
                        ->when(!empty($name), function($query) use ($name) {
                            $query->where('name', 'like', '%'.$name.'%');
                        })
                        ->when(!empty($types), function($query) use ($types) {
                            if (is_array($types)) {
                                $query->whereIn('bullet_type_id', $types);
                            } else {
                                $query->where('bullet_type_id', $types);
                            }
                        })
                        ->paginate(10);

        return response()->json($bullets);
    }

    public function getReportBulletsByDivision(Request $request, $divId)
    {
        $bullets = ReportBullet::where('division_id', $divId)->get();

        return response()->json($bullets);
    }

    public function store(Request $request)
    {
        try {
            $bullet = new ReportBullet;
            $bullet->name           = $request['name'];
            $bullet->bullet_no      = $request['bullet_no'];
            $bullet->bullet_type_id = $request['bullet_type_id'];
            $bullet->bullet_id      = $request['bullet_id'];
            $bullet->unit_text      = $request['unit_text'];
            $bullet->division_id    = $request['division_id'];
    
            if($bullet->save()) {
                return response()->json([
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    'bullet'    => $bullet,
                ]);
            } else {
                return response()->json([
                    'status'    => 0,
                    'message'   => 'Something went wrong!!',
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json([
                'status'    => 0,
                'message'   => $ex->getMessage(),
            ]);
        }
    }
}
