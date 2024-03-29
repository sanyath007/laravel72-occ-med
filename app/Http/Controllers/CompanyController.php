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
    public function search(Request $request)
    {
        $type       = $request->get('type');
        $name       = $request->get('name');
        $amphur     = $request->get('amphur');
        $changwat   = $request->get('changwat');

        $companies = Company::with('type','tambon','amphur','changwat')
                        ->when(!empty($name), function($query) use ($name) {
                            $query->where('name', 'like', '%'.$name.'%');
                        })
                        ->when(!empty($type), function($query) use ($type) {
                            $query->where('company_type_id', $type);
                        })
                        ->when(!empty($amphur), function($query) use ($amphur) {
                            $query->where('amphur_id', $amphur);
                        })
                        ->when(!empty($changwat), function($query) use ($changwat) {
                            $query->where('changwat_id', $changwat);
                        })
                        ->paginate(10);

        return response()->json($companies);
    }

    public function getAll(Request $request)
    {
        $type       = $request->get('type');
        $name       = $request->get('name');
        $amphur     = $request->get('amphur');
        $changwat   = $request->get('changwat');

        $companies = Company::with('type','tambon','amphur','changwat')
                        ->when(!empty($name), function($query) use ($name) {
                            $query->where('name', 'like', '%'.$name.'%');
                        })
                        ->when(!empty($type), function($query) use ($type) {
                            $query->where('company_type_id', $type);
                        })
                        ->when(!empty($amphur), function($query) use ($amphur) {
                            $query->where('amphur_id', $amphur);
                        })
                        ->when(!empty($changwat), function($query) use ($changwat) {
                            $query->where('changwat_id', $changwat);
                        })
                        ->paginate(10);

        return response()->json($companies);
    }

    public function getById(Request $request, $id)
    {
        $company = Company::with('type','tambon','amphur','changwat')->find($id);

        return response()->json($company);
    }

    public function getInitialFormData()
    {
        return [
            "types"     => CompanyType::all(),
            "changwats" => Changwat::all(),
            "amphurs"   => Amphur::all(),
            "tambons"   => Tambon::all(),
        ];
    }

    public function store(Request $request)
    {
        try {
            $company = new Company;
            $company->name = $request['name'];
            $company->company_type_id = $request['company_type_id'];
            $company->address = $request['address'];
            $company->moo = $request['moo'];
            $company->road = $request['road'];
            $company->tambon_id = $request['tambon_id'];
            $company->amphur_id = $request['amphur_id'];
            $company->changwat_id = $request['changwat_id'];
            $company->zipcode = $request['zipcode'];
            $company->tel = $request['tel'];
            $company->email = $request['email'];
            $company->coordinates = $request['coordinates'];
            $company->contact_name = $request['contact_name'];
            $company->contact_tel = $request['contact_tel'];
            $company->contact_email = $request['contact_email'];
            $company->remark = $request['remark'];

            if ($company->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Insertion successfully!!',
                    "company"   => $company
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $company = Company::find($id);
            $company->name = $request['name'];
            $company->company_type_id = $request['company_type_id'];
            $company->address = $request['address'];
            $company->moo = $request['moo'];
            $company->road = $request['road'];
            $company->tambon_id = $request['tambon_id'];
            $company->amphur_id = $request['amphur_id'];
            $company->changwat_id = $request['changwat_id'];
            $company->zipcode = $request['zipcode'];
            $company->tel = $request['tel'];
            $company->email = $request['email'];
            $company->coordinates = $request['coordinates'];
            $company->contact_name = $request['contact_name'];
            $company->contact_tel = $request['contact_tel'];
            $company->contact_email = $request['contact_email'];
            $company->remark = $request['remark'];

            if ($company->save()) {
                return [
                    'status'    => 1,
                    'message'   => 'Updation successfully!!',
                    "company"   => $company
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }

    public function destroy($id)
    {
        try {
            $company = Company::find($id);

            if ($company->delete()) {
                return [
                    'status'    => 1,
                    'message'   => 'Deletion successfully!!'
                ];
            } else {
                return [
                    'status'    => 0,
                    'message'   => 'Something went wrong!!'
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status'    => 0,
                'message'   => $ex->getMessage()
            ];
        }
    }
}
