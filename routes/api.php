<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/
/** Auth/login */
Route::post('/login', 'Auth\LoginController@login');

/*
|--------------------------------------------------------------------------
| Protected routes
|--------------------------------------------------------------------------
*/
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'auth:sanctum'], function() {
    /** Addresses */
    Route::get('/addresses', 'AddressController@getAddresses');

    /** Users */
    Route::get('/users', 'UserController@getUsers');
    Route::get('/users/{id}', 'UserController@getUser');

    /** Patients */
    Route::get('/patients', 'PatientController@getPatients');
    Route::get('/patients/{id}', 'PatientController@getPatient');
    Route::post('/patients', 'PatientController@store');
    Route::put('/patients/{id}', 'PatientController@update');
    Route::delete('/patients/{id}', 'PatientController@delete');

    /** Clinic Monthly */
    Route::get('/clinic-monthlies', 'ClinicMonthlyController@getMonthlies');
    Route::get('/clinic-monthlies/{year}', 'ClinicMonthlyController@getMonthlySummary');
    Route::post('/clinic-monthlies', 'ClinicMonthlyController@store');

    /** Prevention Monthly */
    Route::get('/prevention-monthlies', 'PreventionMonthlyController@getMonthlies');
    Route::get('/prevention-monthlies/{year}', 'PreventionMonthlyController@getMonthlySummary');
    Route::post('/prevention-monthlies', 'PreventionMonthlyController@store');

    /** Promotion Monthly */
    Route::get('/promotion-monthlies', 'PromotionMonthlyController@getMonthlies');
    Route::get('/promotion-monthlies/{year}', 'PromotionMonthlyController@getMonthlySummary');
    Route::post('/promotion-monthlies', 'PromotionMonthlyController@store');

    /** Toxicology Monthly */
    Route::get('/toxicology-monthlies', 'ToxicologyMonthlyController@getMonthlies');
    Route::get('/toxicology-monthlies/{year}', 'ToxicologyMonthlyController@getMonthlySummary');
    Route::post('/toxicology-monthlies', 'ToxicologyMonthlyController@store');

    /** Occupation Monthly */
    Route::get('/occupation-monthlies', 'OccupationMonthlyController@getMonthlies');
    Route::get('/occupation-monthlies/{year}', 'OccupationMonthlyController@getMonthlySummary');
    Route::post('/occupation-monthlies', 'OccupationMonthlyController@store');

    /** Checkup Monthly */
    Route::get('/checkup-monthlies', 'CheckupMonthlyController@getMonthlies');
    Route::get('/checkup-monthlies/{year}', 'CheckupMonthlyController@getMonthlySummary');
    Route::post('/checkup-monthlies', 'CheckupMonthlyController@store');

    /** Checkups */
    Route::get('/checkups', 'CheckupController@getCheckups');
    Route::get('/checkups/{id}', 'CheckupController@getCheckup');
    Route::post('/checkups', 'CheckupController@store');

    /** ICD-10 */
    Route::get('/icd10s', 'Icd10Controller@getIcd10s');

    /** Rights */
    Route::get('/rights', 'RightController@getRights');
    Route::get('/rights/{id}', 'RightController@getRight');

    /** Nationalitis */
    Route::get('/nationalities', 'NationalityController@getNationalities');
    Route::get('/nationalities/{id}', 'NationalityController@getNationality');

    /** Pnames */
    Route::get('/pnames', 'PnameController@getPnames');

    /** Doctors */
    Route::get('/doctors', 'DoctorController@getDoctors');

    /** Employees */
    Route::get('/employees', 'EmployeeController@getEmployees');

    /** Divisions */
    Route::get('/divisions', 'DivisionController@getDivisions');

    /** ReportBullets */
    Route::get('/report-bullets', 'ReportBulletController@getReportBullets');
    Route::get('/report-bullets/division/{divId}', 'ReportBulletController@getReportBulletsByDivision');
    Route::post('/report-bullets', 'ReportBulletController@store');

    /** Companies */
    Route::get('/companies', 'CompanyController@getCompanies');
    Route::get('/companies/{id}', 'CompanyController@getCompany');
    Route::get('/companies/init/forms', 'CompanyController@getInitForms');
    Route::post('/companies', 'CompanyController@store');
    Route::put('/companies/{id}', 'CompanyController@update');
    Route::delete('/companies/{id}', 'CompanyController@delete');

    /** Auth/login */
    Route::post('/logout', 'Auth\LoginController@logout');
    Route::post('/me', 'Auth\LoginController@me');
});
