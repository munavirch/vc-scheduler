<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Location
Route::get('/location', 'LocationController@showAll');

Route::get('/location/{location}', 'LocationController@show');

Route::post('/location', 'LocationController@create');

Route::patch("/location/{location}", 'LocationController@update');

Route::delete('/location/{location}', 'LocationController@delete');


//Department
Route::get('/department', 'DepartmentController@showAll');
Route::get('/department/{department}', 'DepartmentController@show');
Route::post('/department', 'DepartmentController@create');
Route::patch('/department/{department}', 'DepartmentController@update');
Route::delete('department/{department}', 'DepartmentController@delete');


//Endpoint
Route::get('/endpoint', 'EndpointController@showAll');
Route::get('/endpoint/{endpoint}', 'EndpointController@show');
Route::post('/endpoint', 'EndpointController@create');
Route::patch('/endpoint/{endpoint}', 'EndpointController@update');
Route::delete('/endpoint/{endpoint}', 'EndpointController@delete');



//Conference
Route::get('conference', 'ConferenceController@showAll');
Route::get('conference/{id}', 'ConferenceController@show');
Route::post('conference', 'ConferenceController@create');