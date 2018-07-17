<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Conference;
use App\Participant;
use App\Endpoint;
use App\Location;

class ConferenceController extends Controller
{

	protected $vc_id_suffixes = ['61','71','81'];
	protected $items_per_page = 20;


    public function create(){
    	$this->validate(request(),[
    		'name'=>'string|required',
    		'start'=>'string|required',
    		'end'=>'string|required'
    	]);
    	$token = str_random(100);
    	$owner = request('owner');
    	//get scheduler login from authenticated user
    	$scheduler = "admin";
    	$start = request('start');
    	$end = request('end');
    	$start = substr($start, 0, 10)." ".substr($start, 11).":00";
    	$end = substr($end, 0, 10)." ".substr($end, 11).":00";
    	$vcid = $this->generateVcId($start, $end);
    	$data = [
    		'title' => request('name'),
    		'start' => $start,
    		'end' => $end,
    		'owner' => $owner,
    		'token' => $token,
    		'scheduler' => $scheduler,
    		'vcid' => $vcid
    	];
    	$conference = Conference::create($data);
    	$participants = request('participants');
    	foreach ($participants as $participant) {
    		$endpoint = Endpoint::where('id', $participant['endpoint_id'])->with('location')->first();
    		$data = [
    			'name' => $participant['name'],
    			'email' => $participant['mail'],
    			'location_id' => $endpoint->location->id,
    			'room' => $endpoint->id
    		];
    		$conference->participants()->create($data);
    	}
    	return response()->json($this->getConference($conference->id),201);
    }


    public function show($id){
    	return $this->getConference($id);
    }

    public function showAll(){
    	$page = request()->query('page', 1);
    	$conference = Conference::select(['id', 'vcid', 'title', 'start', 'end', 'status', 'owner', 'scheduler'])->get();
    	$conference = $conference->chunk($this->items_per_page);
    	if($page < 1){
    		return $conference[0];
    	}elseif ($page >= count($conference)) {
    		return $conference[count($conference)-1];
    	}
    	return $conference[$page-1];
    }

    public function generateVcId($from, $to){
    	$ids = Conference::select('vcid')->whereBetween('start', [$from, $to])->whereBetween('end', [$from, $to])->get();
    	$vcid;
    	while(true){
    		$vcid = $this->vc_id_suffixes[rand(0, count($this->vc_id_suffixes)-1)];
    		$vcid .= (string)rand(1111,9999);
    		foreach ($ids as $id) {
    			if($id->vcid == $vcid){
    				continue;
    			}
    		}
    		break;
    	}
    	return $vcid;
    }

    public function getConference($id, $output=true){
    	$conference = Conference::where('id', $id)->with('participants')->first();
    	if($output === true){
    		unset($conference->token);
    		$conference->start_display_f = \Carbon\Carbon::parse($conference->start)->diffForHumans();
    		$conference->start_display = \Carbon\Carbon::parse($conference->start)->toDayDateTimeString();
    		$conference->end_display_f = \Carbon\Carbon::parse($conference->end)->diffForHumans();
    		$conference->end_display = \Carbon\Carbon::parse($conference->end)->toDayDateTimeString();
            if($conference->status == -1){
                $conference->status_text = "Cancelled";
            }else{
                $start = \Carbon\Carbon::parse($conference->start);
                $end = \Carbon\Carbon::parse($conference->end);
                if($start->isFuture()){
                    $conference->status = 0;
                    $conference->status_text = "Active";
                }else{
                    if($end->isFuture()){
                        $conference->status = 1;
                        $conference->status_text = "Running";
                    }else{
                        $conference->status = 3;
                        $conference->status_text = "Finished";
                    }
                }
            }
    	}
    	return $conference;
    }
}
