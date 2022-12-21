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
    /** Users */
    Route::get('/users', 'UserController@getUsers');
    Route::get('/users/{id}', 'UserController@getUser');

    /** Patients */
    Route::get('/patients', 'PatientController@getPatients');
    Route::get('/patients/{id}', 'PatientController@getPatient');
    Route::post('/patients', 'PatientController@store');

    /** ICD-10 */
    Route::get('/icd10s', 'Icd10Controller@getIcd10s');

    /** Rights */
    Route::get('/rights', 'RightController@getRights');
    Route::get('/rights/{id}', 'RightController@getRight');

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
