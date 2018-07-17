<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conference extends Model
{
	public $timestamps = false;
	public $fillable = [ 'vcid', 'title', 'start', 'end', 'owner', 'status', 'token', 'scheduler' ]; 


    public function participants(){
    	return $this->hasMany(Participant::class);
    }
}
