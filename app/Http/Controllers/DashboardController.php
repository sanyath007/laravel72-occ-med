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
        $sdate = $request->get('from').'-01';
        $edate = date("Y-m-t", strtotime($request->get('to').'-01'));

        $data = [
            'surveying'     => Surveying::whereBetween('survey_date', [$sdate, $edate])->count(),
            'screening'     => ProactiveScreening::whereBetween('screen_date', [$sdate, $edate])->count(),
            'investigating' => Investigation::whereBetween('invest_date', [$sdate, $edate])->count(),
            'training'      => Training::whereBetween('train_date', [$sdate, $edate])->count(),
            'visiting'      => Visitation::whereBetween('visit_date', [$sdate, $edate])->count(),
        ];

        return response()->json($data);
    }

    public function getSurveyingGroupByCompanies(Request $request, $year)
    {
        $sdate = $request->get('from').'-01';
        $edate = date("Y-m-t", strtotime($request->get('to').'-01'));

        $data = Surveying::select(
                                \DB::raw('concat(year(survey_date), month(survey_date)) as month'),
                                \DB::raw('count(company_id) as num')
                            )
                            ->groupBy(\DB::raw('concat(year(survey_date), month(survey_date))'))
                            ->whereBetween('survey_date', [$sdate, $edate])
                            ->get();

        return response()->json($data);
    }

    public function getInvestByDivisions(Request $request, $year)
    {
        $sdate = '2023-10-01';
        $edate = '2024-09-31';

        $data = [
            'dep2' => Investigation::select(
                                \DB::raw('concat(year(invest_date), month(invest_date)) as month'),
                                \DB::raw('count(id) as num')
                            )
                            ->groupBy(\DB::raw('concat(year(invest_date), month(invest_date))'))
                            ->whereBetween('invest_date', [$sdate, $edate])
                            ->where('division_id', 2)
                            ->get(),
            'dep3' => Investigation::select(
                                \DB::raw('concat(year(invest_date), month(invest_date)) as month'),
                                \DB::raw('count(id) as num')
                            )
                            ->groupBy(\DB::raw('concat(year(invest_date), month(invest_date))'))
                            ->whereBetween('invest_date', [$sdate, $edate])
                            ->where('division_id', 3)
                            ->get(),
            'dep4' => Investigation::select(
                                \DB::raw('concat(year(invest_date), month(invest_date)) as month'),
                                \DB::raw('count(id) as num')
                            )
                            ->groupBy(\DB::raw('concat(year(invest_date), month(invest_date))'))
                            ->whereBetween('invest_date', [$sdate, $edate])
                            ->where('division_id', 4)
                            ->get(),
        ];

        return response()->json($data);
    }
}
