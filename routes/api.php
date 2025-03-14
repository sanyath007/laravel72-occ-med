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
    /** Dashboard */
    Route::get('/dashboard/{year}/stat', 'DashboardController@getStats');
    Route::get('/dashboard/{year}/surveying-group-companies', 'DashboardController@getSurveyingGroupByCompanies');
    Route::get('/dashboard/{year}/invest-by-divisions', 'DashboardController@getInvestByDivisions');

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
    Route::delete('/patients/{id}', 'PatientController@destroy');

    /** Monthlies */
    Route::get('/monthlies/division/{division}', 'MonthlyController@getMonthlies');
    Route::get('/monthlies/division/{division}/year/{year}', 'MonthlyController@getMonthlySummary');
    Route::get('/monthlies/{id}', 'MonthlyController@getMonthly');
    Route::post('/monthlies', 'MonthlyController@store');
    Route::put('/monthlies/{id}', 'MonthlyController@update');
    Route::delete('/monthlies/{id}', 'MonthlyController@destroy');

    /** Checkups */
    Route::get('/checkups', 'CheckupController@getCheckups');
    Route::get('/checkups/{id}', 'CheckupController@getCheckup');
    Route::post('/checkups', 'CheckupController@store');
    
    /** Toxicologies */
    Route::get('/toxicologies', 'ToxicologyController@getToxicologies');
    Route::get('/toxicologies/{id}', 'ToxicologyController@getToxicology');
    Route::post('/toxicologies', 'ToxicologyController@store');

    /** Investigations */
    Route::get('/investigations', 'InvestigationController@getAll');
    Route::get('/investigations/search', 'InvestigationController@search');
    Route::get('/investigations/{id}', 'InvestigationController@getById');
    Route::post('/investigations', 'InvestigationController@store');
    Route::post('/investigations/{id}', 'InvestigationController@update');
    Route::delete('/investigations/{id}', 'InvestigationController@destroy');

    /** Guildelines */
    Route::get('/guidelines', 'GuidelineController@getAll');
    Route::get('/guidelines/search', 'GuidelineController@search');
    Route::get('/guidelines/{id}', 'GuidelineController@getById');
    Route::post('/guidelines', 'GuidelineController@store');
    Route::post('/guidelines/{id}', 'GuidelineController@update');
    Route::delete('/guidelines/{id}', 'GuidelineController@destroy');

    /** NetworkMeetings */
    Route::get('/network-meetings', 'NetworkMeetingController@getAll');
    Route::get('/network-meetings/search', 'NetworkMeetingController@search');
    Route::get('/network-meetings/{id}', 'NetworkMeetingController@getById');
    Route::post('/network-meetings', 'NetworkMeetingController@store');
    Route::post('/network-meetings/{id}', 'NetworkMeetingController@update');
    Route::delete('/network-meetings/{id}', 'NetworkMeetingController@destroy');

    /** Visitations */
    Route::get('/visitations', 'VisitationController@getAll');
    Route::get('/visitations/search', 'VisitationController@search');
    Route::get('/visitations/{id}', 'VisitationController@getById');
    Route::post('/visitations', 'VisitationController@store');
    Route::post('/visitations/{id}', 'VisitationController@update');
    Route::delete('/visitations/{id}', 'VisitationController@destroy');

    /** Vaccinations */
    Route::get('/vaccinations', 'VaccinationController@getAll');
    Route::get('/vaccinations/search', 'VaccinationController@search');
    Route::get('/vaccinations/{id}', 'VaccinationController@getById');
    Route::get('/vaccinations/init/form', 'VaccinationController@getInitialFormData');
    Route::post('/vaccinations', 'VaccinationController@store');
    Route::post('/vaccinations/{id}', 'VaccinationController@update');
    Route::delete('/vaccinations/{id}', 'VaccinationController@destroy');

    /** Surveyings */
    Route::get('/surveyings', 'WTSurveyingController@getAll');
    Route::get('/surveyings/search', 'WTSurveyingController@search');
    Route::get('/surveyings/{id}', 'WTSurveyingController@getById');
    Route::get('/surveyings/init/form', 'WTSurveyingController@getInitialFormData');
    Route::post('/surveyings', 'WTSurveyingController@store');
    Route::post('/surveyings/{id}', 'WTSurveyingController@update');
    Route::delete('/surveyings/{id}', 'WTSurveyingController@destroy');

    /** Emergency Response Plans */
    Route::get('/er-plans', 'ERPlanController@getAll');
    Route::get('/er-plans/search', 'ERPlanController@search');
    Route::get('/er-plans/{id}', 'ERPlanController@getById');
    Route::get('/er-plans/init/form', 'ERPlanController@getInitialFormData');
    Route::post('/er-plans', 'ERPlanController@store');
    Route::post('/er-plans/{id}', 'ERPlanController@update');
    Route::delete('/er-plans/{id}', 'ERPlanController@destroy');

    /** Trainings */
    Route::get('/trainings', 'TrainingController@getAll');
    Route::get('/trainings/search', 'TrainingController@search');
    Route::get('/trainings/{id}', 'TrainingController@getById');
    Route::get('/trainings/init/form', 'TrainingController@getInitialFormData');
    Route::post('/trainings', 'TrainingController@store');
    Route::post('/trainings/{id}', 'TrainingController@update');
    Route::delete('/trainings/{id}', 'TrainingController@destroy');

    /** Screenings */
    Route::get('/screenings', 'ProactiveScreeningController@getAll');
    Route::get('/screenings/search', 'ProactiveScreeningController@search');
    Route::get('/screenings/{id}', 'ProactiveScreeningController@getById');
    Route::get('/screenings/init/form', 'ProactiveScreeningController@getInitialFormData');
    Route::post('/screenings', 'ProactiveScreeningController@store');
    Route::post('/screenings/{id}', 'ProactiveScreeningController@update');
    Route::delete('/screenings/{id}', 'ProactiveScreeningController@destroy');

    /** Environments */
    Route::get('/environments', 'EnvMeasurementController@getAll');
    Route::get('/environments/search', 'EnvMeasurementController@search');
    Route::get('/environments/{id}', 'EnvMeasurementController@getById');
    Route::get('/environments/init/form', 'EnvMeasurementController@getInitialFormData');
    Route::post('/environments', 'EnvMeasurementController@store');
    Route::post('/environments/{id}', 'EnvMeasurementController@update');
    Route::delete('/environments/{id}', 'EnvMeasurementController@destroy');

    /** Occupations */
    Route::get('/occupations', 'ProblemSurveyingController@getAll');
    Route::get('/occupations/search', 'ProblemSurveyingController@search');
    Route::get('/occupations/{id}', 'ProblemSurveyingController@getById');
    Route::get('/occupations/init/form', 'ProblemSurveyingController@getInitialFormData');
    Route::post('/occupations', 'ProblemSurveyingController@store');
    Route::post('/occupations/{id}', 'ProblemSurveyingController@update');
    Route::delete('/occupations/{id}', 'ProblemSurveyingController@destroy');

    /** Sanitations */
    Route::get('/sanitations', 'StdAssessmentController@getAll');
    Route::get('/sanitations/search', 'StdAssessmentController@search');
    Route::get('/sanitations/{id}', 'StdAssessmentController@getById');
    Route::get('/sanitations/init/form', 'StdAssessmentController@getInitialFormData');
    Route::post('/sanitations', 'StdAssessmentController@store');
    Route::post('/sanitations/{id}', 'StdAssessmentController@update');
    Route::delete('/sanitations/{id}', 'StdAssessmentController@destroy');

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
    Route::get('/employees', 'EmployeeController@getAll');
    Route::get('/employees/search', 'EmployeeController@search');
    Route::get('/employees/{id}', 'EmployeeController@getById');
    Route::get('/employees/init/form', 'EmployeeController@getInitialFormData');
    Route::post('/employees', 'EmployeeController@store');
    Route::put('/employees/{id}', 'EmployeeController@update');
    Route::delete('/employees/{id}', 'EmployeeController@destroy');

    /** Divisions */
    Route::get('/divisions', 'DivisionController@getDivisions');

    /** ReportBullets */
    Route::get('/report-bullets', 'ReportBulletController@getReportBullets');
    Route::get('/report-bullets/{id}', 'ReportBulletController@getReportBullet');
    Route::get('/report-bullets/division/{divId}', 'ReportBulletController@getReportBulletsByDivision');
    Route::post('/report-bullets', 'ReportBulletController@store');
    Route::put('/report-bullets/{id}', 'ReportBulletController@update');
    Route::delete('/report-bullets/{id}', 'ReportBulletController@destroy');

    /** Companies */
    Route::get('/companies', 'CompanyController@getAll');
    Route::get('/companies/search', 'CompanyController@search');
    Route::get('/companies/{id}', 'CompanyController@getById');
    Route::get('/companies/init/form', 'CompanyController@getInitialFormData');
    Route::post('/companies', 'CompanyController@store');
    Route::put('/companies/{id}', 'CompanyController@update');
    Route::delete('/companies/{id}', 'CompanyController@destroy');

    /** Auth/login */
    Route::post('/logout', 'Auth\LoginController@logout');
    Route::post('/me', 'Auth\LoginController@me');
});
