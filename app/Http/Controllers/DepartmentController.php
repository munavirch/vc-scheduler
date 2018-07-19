<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;

class DepartmentController extends Controller
{
    public function showAll(Request $request){
        if($request->ajax()){
    	   return Department::all();
        }else{
            return view('index');
        }
    }

    public function show(Department $department){
    	return $department;
    }

    public function create(){
    	$this->validate(request(), ["name"=>"string|required"]);
    	return Department::create(request(['name']));
    }

    public function delete(Department $department){
        $department->delete();
        return ["status"=>true];
    }

    public function update(Department $department){
        $this->validate(request(), ["name"=>'string|required']);
        $department->name = request('name');
        $department->save();
        return $department;
    }
}
