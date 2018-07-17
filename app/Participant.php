<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
	public $timestamps = false;
	protected $fillable = [ 'name', 'location_id', 'department_id', 'email', 'room', 'status' ]; 


    public function coneference(){
    	return $this->belongsTo(Conference::class);
    }

    public function endpoint(){
    	return $this->belongsTo(Endpoint::class);
    }
}
