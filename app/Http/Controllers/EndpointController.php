<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Endpoint;
use App\Location;

class EndpointController extends Controller
{
    private function validations(){
        $this->validate(request(), [
            'name'=>'string|required',
            'location'=>'integer|required'
        ]);
    }
    public function create(){
        $this->validations();
    	$location = Location::find(request('location'));
    	$endpoint = $location->endpoint()->create(request(['name']));
    	return Endpoint::where('id', $endpoint->id)->with('location')->get();
    }

    public function show(Endpoint $endpoint){
    	return $endpoint->with('location')->get();
    }

    public function showAll(){
    	return Endpoint::with('location')->get();
    }

    public function update(Endpoint $endpoint){
        $this->validations();
        $location = Location::findOrFail(request('location'));
        $endpoint->location()->associate($location);
        $endpoint->save();
        return Endpoint::where('id', $endpoint->id)->with('location')->get();
    }

    public function delete(Endpoint $endpoint){
        $endpoint->delete();
        return ["status"=>true];
    }
}
