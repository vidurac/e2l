<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\House;
use App\Badge;
use Image;

class UploadController extends Controller
{

    public function __construct()
	{
        $this->middleware('jwt.auth');
    }

	//profile image upload section
	public function profile($id=null, Request $request)
	{

		$request = $request->all();
		if($id==null)
		{
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422); 
		}
		if ($request['image']->isValid()) 
		{
		    // upload path 
			$destinationPath = 'uploads/profile/';

			$extension = $request['image']->getClientOriginalExtension();
			$image_types = array('gif','png' ,'jpg', 'pdf', 'jpeg', 'GIF', 'PNG', 'JPG', 'PDF', 'JPEG');

			//check image types
			if(!in_array($extension, $image_types)){
				return Response::json([
					'query_status' => 'error',
					'message' => 'data not found'
				], 404);
			}

			$fileName = 'profile_'.$id.'.'.$extension; 
			// create instance
			$img = Image::make($request['image']);
			// dd($request['image']);
			// resize image
			$img->fit(300, 300);
			// save image
			if($img->save($destinationPath.$fileName))
			{
				User::where('id', $id)->update([ 'profile_image' => $destinationPath.$fileName ]);
				
				$filepath = $destinationPath.'/'.$fileName;
				
				return Response::json([ 
						'query_status' => 'success', 
						'filepath' => $filepath
					], 201);
				
			}
		}
	}

    public function house($id=null, Request $request)
	{
		$request = $request->all();
		if($id==null)
		{
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422); 
		}
		if ($request['image']->isValid()) 
		{
		    // upload path 
			$destinationPath = 'uploads/house'; 
			// getting image extension
            $extension = $request['image']->getClientOriginalExtension();
			$image_types = array('gif','png' ,'jpg', 'pdf', 'jpeg', 'GIF', 'PNG', 'JPG', 'PDF', 'JPEG');

			//check image types
			if(!in_array($extension, $image_types)){
				return Response::json([
					'query_status' => 'error',
					'message' => 'data not found'
				], 404);
			}
			$fileName = 'house_'.$id.'.'.$extension;

			if($request['image']->move($destinationPath, $fileName)) 
			{ 
				House::where('id', $id)->update([ 'image' => $fileName ]); 
				$filepath = $destinationPath.'/'.$fileName; 
				
				return Response::json([ 
						'query_status' => 'success', 
						'filepath' => $filepath 
					], 201); 
				
			}
		}
	}

	public function badge($id=null, Request $request)
	{
		$request = $request->all();
		if($id==null)
		{
			return Response::json([
				'query_status' => 'error',
				'message' => 'Please provide all required fields'
			], 422);
		}
		if ($request['badge_image']->isValid())
		{
			// upload path
			$destinationPath = 'uploads/badges';

			$extension = $request['badge_image']->getClientOriginalExtension();
			$image_types = array('gif','png' ,'jpg', 'pdf', 'jpeg', 'GIF', 'PNG', 'JPG', 'PDF', 'JPEG');
			
			//check image types
			if(!in_array($extension, $image_types)){
				return Response::json([
					'query_status' => 'error',
					'message' => 'data not found'
				], 404);
			}

			$uniqueId = uniqid();
			$fileName = 'badge_'.$uniqueId.'.'.$extension;

			if($request['badge_image']->move($destinationPath, $fileName))
			{
				Badge::where('id', $id)->update([ 'badge_image' => $fileName ]);
				$filepath = $destinationPath.'/'.$fileName;
				return Response::json([
					'query_status' => 'success',
					'filepath' => $filepath
				], 201);

			}
		}
	}
	
}
