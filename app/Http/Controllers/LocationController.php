<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;

class LocationController extends Controller
{
    public function showAll(){
    	return Location::all();
    }

    public function show(Location $location){
    	return $location;
    }

    public function create(){
    	$this->validate(request(), ['name'=>'string']);
    	$item = Location::create(request(['name']));
    	return $item;
    }

    public function update(Location $location){
        $this->validate(request(), ['name'=>'string']);
        $location->name = request('name');
        $location->save();
        return $location;
    }

    public function delete(Location $location){
        $location->delete();
        return ["status"=>true];
    }
}
