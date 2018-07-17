<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [ 'name' ];
    public $timestamps = false;

    public function endpoint(){
    	return $this->hasMany(\App\Endpoint::class);
    }
}
