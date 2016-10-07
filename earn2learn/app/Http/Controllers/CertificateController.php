<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\MailSubscription;

use App\User;
use App\Certificate;
use App\Attempt;
use App\Video;
use App\Category;
use App\ChildHouse;
use View;
use Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;

class CertificateController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
        /* House name / Child name (first & last) / Main category / Date (Issused) */
    }
    
    public function index()
    {
        return View::make('certificate/index')->render();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function by_id($id=null) 
    { 
        if($id==null) 
            return Response::json([ 
                    'query_status' => 'error', 
                    'message' => 'missing argument' 
                ], 405); 
            
        $certificate = Certificate::select('certificates.*', 'user.f_name', 'user.l_name', 'house.name', 'category.name') 
                        ->join('user', 'user.id', '=', 'certificates.child_id') 
                        ->join('house', 'house.id', '=', 'certificates.house_id') 
                        ->join('category', 'category.id', '=', 'certificates.category_id') 
                        ->where('certificates.id', $id)
                        ->where('certificates.enable', 1)
                        ->first();
                        
        if(!$certificate->count()) 
            return Response::json([ 
                    'query_status' => 'error', 
                    'message' => 'certificates not found' 
                ], 404);
                
        return Response::json([
                'query_status' => 'success',
                'data' => $certificate
            ], 200);
    } 
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function by_child($id=null) 
    { 
        if($id==null) 
            return Response::json([ 
                    'query_status' => 'error', 
                    'message' => 'missing argument' 
                ], 405); 
            
        $certificate = Certificate::select('certificates.*', 'user.f_name', 'user.l_name', 'house.name', 'category.name') 
                        ->join('user', 'user.id', '=', 'certificates.child_id') 
                        ->join('house', 'house.id', '=', 'certificates.house_id') 
                        ->join('category', 'category.id', '=', 'certificates.category_id') 
                        ->where('certificates.child_id', $id)
                        ->where('certificates.enable', 1)
                        ->get();
                        
        if(empty($certificate)) 
            return Response::json([ 
                    'query_status' => 'error', 
                    'message' => 'certificates not found' 
                ], 404);
                
        return Response::json([
                'query_status' => 'success',
                'data' => $certificate
            ], 200);
    } 

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function create_certificate($attempt_id=null, $child_id=null)
    {



        if($attempt_id==null or $child_id==null) 
            return Response::json([ 
                    'query_status' => 'error', 
                    'message' => 'missing argument' 
                ], 405); 
            
        $attempt_id = $attempt_id; 
        $child_id = $child_id; 
        
        $category = Attempt::select('category.id', 'category.parent_cat_id') 
                    ->join('quizzes', 'quizzes.id', '=', 'attempts.quiz_id') 
                    ->join('videos', 'videos.id', '=', 'quizzes.video_id') 
                    ->join('category', 'category.id', '=', 'videos.category_id') 
                    ->where('attempts.id', $attempt_id) 
                    ->first();


        $this_cat = $category->id;
        $parent_cat = $category->parent_cat_id;
        // dd($parent_cat);
        if ($parent_cat==0) // category not have a parent
            $parent_cat = $this_cat;
        
        $this_cat_videos = Video::select('id as video_id', 'category_id')
                    ->where('category_id', $this_cat)
                    ->get();
            
        $attept_cat_videos = Attempt::select('category.id as cat_id', 'category.parent_cat_id', 'quizzes.video_id', 'attempts.quiz_id', 'attempts.id as attempt_id') 
                    ->join('childquizallocations', 'childquizallocations.id', '=', 'attempts.allocation_id') 
                    ->join('quizzes', 'quizzes.id', '=', 'attempts.quiz_id') 
                    ->join('videos', 'videos.id', '=', 'quizzes.video_id') 
                    ->join('category', 'category.id', '=', 'videos.category_id') 
                    ->where('childquizallocations.child_id', $child_id) 
                    ->where('category.id', $this_cat) 
                    ->groupBy('videos.id') 
                    ->get(); 
            
        $main_cat_sub_videos = Category::select('category.id', 'category.parent_cat_id', 'videos.id as video_id') 
                    ->join('videos', 'videos.category_id', '=', 'category.id') 
                    ->where('category.parent_cat_id', $parent_cat) 
                    ->get(); 
                    
        if( count( array_diff($main_cat_sub_videos->pluck('video_id')->toArray(), $attept_cat_videos->pluck('video_id')->toArray()) ) == 0 or true ) 
        { 
            // return 'You have completed'; 
            $house_id = ChildHouse::select('house_id')->where('child_id', $child_id)->first()->house_id;
            $certificate_id = "E2L/CRT/H$house_id"."C$child_id"."CT$parent_cat/".time();
            $certificate = Certificate::create(['certificate_id'=> $certificate_id, 'child_id'=> $child_id, 'house_id'=> $house_id, 'category_id'=> $parent_cat, 'issue_date'=> date('Y-m-d H:i:s'), 'enable'=> 1 ]);
            
            $child = User::select('f_name', 'l_name')->where('id', $child_id)->first();
            $category = Category::select('name')->where('id', $parent_cat)->first();
            $category_sub = Category::select('name')->where('id', $category->id)->first();

            $this->certificate_imege($certificate_id ,$child->f_name, $child->l_name, $category->name, date('Y-m-d H:i:s'));
            // dd((isset($category_sub->name))? $category_sub->name: null);
            $meta = array(
                    'child_f_name'  => $child->f_name,
                    'child_l_name'  => $child->l_name,
                    'category'      => $category->name,
                    'category_sub'  => (isset($category_sub->name))? $category_sub->name: null,
                    'certificate'   => $certificate_id,
                );
                // dd($meta);
            $userData = ChildHouse::select('user.id','user.email')
                ->join('house', 'house.id', '=', 'childhouses.house_id')
                ->join('user', 'user.id', '=', 'house.user_id')    
                ->where('childhouses.child_id', $child_id)
                ->first();

            $receiver = $userData->email;
            $subject  = $child->f_name." earned a certificate";
            $message  = "Child Got a Certificate!";
            $template = 'certificate';
            $token    = '';

            $mailSetting = MailSubscription::where('user_id', $userData->id)->first();
            if(isset($mailSetting) && $mailSetting->certificate){
                $this->send_email($receiver, $message, $subject, $template, $token, $meta);
            }

            return true; 

        }   
        
    }
    
    /**
     *
     * 
     * 
     */
    public function certificate_imege($certificate ,$f_name, $l_name, $category, $date)
    {
        $conv = new \Anam\PhantomMagick\Converter();
        $data = array(
                'name' => $f_name.' '.$l_name,  
                'category' => $category,  
                'date' => date('F d Y', strtotime($date)),  
            );

        $view = View::make('certificate/index', $data)->render();
        $file = $file = str_replace('/', '-', $certificate).'.png';

        $conv->addPage($view)
            ->width(800)
            ->height(600)
            ->quality(50)
            ->toPng()
            ->save('./uploads/certificate/'.$file);
    }
    
    /*
     *
     *
     */
    // public function certificate_image($id=null, $content=null)
    public function certificate_image(Request $request)
    {
        if( is_null($request->id) or is_null($request->getContent()) )
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
                ], 401);
            
        $file = str_replace('/', '-', $request->id).'.png';
        
        $conv = new \Anam\PhantomMagick\Converter();
        $conv->addPage($request->getContent())
            ->width(800)
            ->height(600)
            ->quality(50)
            ->toPng()
            ->save('./uploads/certificate/'.$file);
        
        $data = array(
                'url'=>'/uploads/certificate/'.$file,
                'file'=>$file
            );
        
        return Response::json([
                'query_status' => 'success',
                'data' => $data
            ], 200);
    }
    
}
