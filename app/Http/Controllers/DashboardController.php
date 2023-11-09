<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surveying;
use App\Models\ProactiveScreening;
use App\Models\Investigation;
use App\Models\Training;
use App\Models\Visitation;

class DashboardController extends Controller
{
    public function getStats(Request $request, $year)
    {
        $sdate = '2023-10-01';
        $edate = '2024-09-31';

        $data = [
            'surveying'     => Surveying::whereBetween('survey_date', [$sdate, $edate])->count(),
            'screening'     => ProactiveScreening::whereBetween('screen_date', [$sdate, $edate])->count(),
            'investigating' => Investigation::whereBetween('invest_date', [$sdate, $edate])->count(),
            'training'      => Training::whereBetween('train_date', [$sdate, $edate])->count(),
            'visiting'      => Visitation::whereBetween('visit_date', [$sdate, $edate])->count(),
        ];

        return response()->json($data);
    }
}
