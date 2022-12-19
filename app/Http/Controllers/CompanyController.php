<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\CompanyType;
use App\Models\Changwat;
use App\Models\Amphur;
use App\Models\Tambon;

class CompanyController extends Controller
{
    public function getCompanies(Request $request)
    {
        $name       = $request->get('name');
        $amphur     = $request->get('amphur');
        $changwat   = $request->get('changwat');

        $companies = Company::with('type')
                        ->when(!empty($name), function($query) use ($name) {
                            $query->where('name', 'like', '%'.$name.'%');
                        })
                        ->when(!empty($amphur), function($query) use ($amphur) {
                            $query->where('amphur_id', $amphur);
                        })
                        ->when(!empty($changwat), function($query) use ($changwat) {
                            $query->where('changwat_id', $changwat);
                        })
                        ->paginate(10);

        return [
            "companies" => $companies
        ];
    }

    public function getCompany(Request $request, $id)
    {
        $company = Company::find($id)->with('type');

        return [
            "company" => $company
        ];
    }

    public function getInitForms()
    {
        return [
            "companyTypes"  => CompanyType::all(),
            "changwats"     => Changwat::all(),
            "amphurs"       => Amphur::all(),
            "tambons"       => Tambon::all(),
        ];
    }
}
