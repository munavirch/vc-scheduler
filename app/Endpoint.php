<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Endpoint extends Model
{
    protected $fillable = [ 'name' ];
    public $timestamps = false;

    public function location(){
    	return $this->belongsTo(\App\Location::class);
    }
}
