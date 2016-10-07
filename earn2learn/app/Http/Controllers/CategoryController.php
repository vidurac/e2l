<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use Auth;
// use Request;
use Response;
use App\Category;
use App\Video;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Log;

class CategoryController extends Controller
{	
	public function __construct(){
        $this->middleware('jwt.auth');
    }
	
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		
		$categories = Category::latest()->where('enable', 1)->get();
		/*$categories = DB::table('category as c1') 
						->leftJoin('category as c2','c2.parent_cat_id','=','c1.id')
						->where('c2.enable', 1)
						->where('c1.enable', 1)
						->select('c2.*','c1.name as parent_category')
						->get();*/

		if(count($categories) == 0)
		{
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
		
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $categories
	    ], 200);
		
	}

	public function getCategoryForLessons()
	{
		//$categories = Category::latest()->where('enable', 1)->get();
		$categories = DB::table('category as c1') 
						->leftJoin('category as c2','c2.parent_cat_id','=','c1.id')
						->where('c2.enable', 1)
						->where('c1.enable', 1)
						->select('c2.*','c1.name as parent_category')
						->get();

		if(count($categories) == 0)
		{
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
		
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $categories
	    ], 200);
	}
	
	/**
	 * For return all main categories.
	 *
	 * @return Response
	 */
	public function get_main_categories()
	{
		$categories = Category::latest()->where('parent_cat_id', 0)->where('enable', 1)->get();
		/*$categories = Category::join('user', 'user.id', '=', 'category.user_id')
					->select('user.role_id', 'category.*')
					->where('category.enable', '=',1)
					->where('category.parent_cat_id', '=',0)
					->get();*/
		
		if(!$categories->count())
		{
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
		
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $categories
	    ], 200);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function get_category_by_id($category_id)
	{
		$category = Category::where('id', '=', $category_id)->where('enable', 1)->first();
		// dd($category);
		if(!$category)
		{
            return Response::json([
                'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
 
        return Response::json([
        	'query_status' => 'success',
            'data' => $category
        ], 200);
	}
	
	/**
	 * For get sub categories & videos.
	 *
	 * @param  int  $category_id
	 * @return Response
	 */
	public function get_sub_items_by_category_id($category_id)
	{
		
		$category = Category::where('id', '=', $category_id)->where('enable', 1)->first();
		$subcategories = Category::latest()->where('parent_cat_id',$category_id)->where('enable', 1)->get();
		$videos = Video::latest()->where('category_id', $category_id)->where('enable', 1)->get();

		if(!$subcategories and !$videos)
		{
            return Response::json([
                'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
 
        return Response::json([
        	'query_status' => 'success',
            'data' => array('category'=>$category, 'subcategory'=>$subcategories, 'video'=>$videos)
        ], 200);
	}
	
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function get_category_by_name($name)
	{
		// $category = Category::find($name);
		
		$category = Category::orderBy('id','asc')
		  ->where('name', 'LIKE', "%{$name}%")
		  ->where('enable', 1)
		  ->get();
		
		if($category->isEmpty()){
			
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'Category does not exist'
            ], 404);
        }

        return Response::json([
    		'query_status' => 'success',
            'data' => $category
        ], 200);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if($this->is_admin() or $this->is_parent())
		{
			
			$request = $request->all();
			
			$request['user_id'] = Auth::user()->id;
			$request['enable'] = 1; // 1;enable, 0:disable

			$category_check = \Validator::make($request, [
				'name' => 'unique:category,name,id'
			]);
			
			if(	! $request['name'] )
			{
					
	            return Response::json([
		            	'query_status' => 'error',
		            	'message' => 'Please provide all required fields'
		            ], 422);
	        }

			$category_status = $category_check->passes();
	        // $category = Category::create($request->all());

			if ($category_status == true) {
				Log::info('Category is true');
				$category = Category::create($request);

				if ($request['parent_cat_id'] == 0)
				{
					$request['parent_cat_id'] = $category->id;
					$request['name'] = $category->name . ' (General)';
					Category::create($request);
				}

				return Response::json([
					'query_status' => 'success',
					'message' => 'Category Created Successfully',
					'data' => $category
				], 201);
			}
			else{
				Log::info('Category is false');

				$category = 'Duplicate category';
				return Response::json([
					'query_status' => 'error',
					'message' => 'A Duplicate category',
					'data' => $category
				], 201);
			}

		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
		
	}

	public function check_lessons_exist($id, Request $request)
	{
		$lessons = Category::select('childquizallocations.id')
                    ->join('videos', 'videos.category_id', '=', 'category.id')
                    ->join('quizzes', 'quizzes.video_id', '=', 'videos.id')
                    ->join('childquizallocations', 'childquizallocations.quiz_id', '=', 'quizzes.id')
                    ->where('category.parent_cat_id', $id)
                    ->where('category.enable', '1')
                    ->count();

        //print_r( $id); die;
        if($lessons > 0)
        {
            return Response::json([
                'query_status' => 'success',
                'lessons_exit' => true
            ], 200);
        }
        else
        {
        	return Response::json([
                'query_status' => 'success',
                'lessons_exit' => false
            ], 200);
        }
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{

		if($this->is_admin() or $this->is_parent())
		{
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$category = Category::findOrFail($id);
			$request = $request->all();
			
			if(	! $request['name'] )
			{
				return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			}

            /*$parent_category = Category::orderBy('id','asc')
                        ->where('name', 'LIKE', "%{$name}%")
                        ->where('enable', 1)
                        ->get();*/

			/*$lessons = Category::select('childquizallocations.id')
                        ->join('videos', 'videos.category_id', '=', 'category.id')
                        ->join('quizzes', 'quizzes.video_id', '=', 'videos.id')
                        ->join('childquizallocations', 'childquizallocations.quiz_id', '=', 'quizzes.id')
                        ->where('category.parent_cat_id', $id)
                        ->where('category.enable', '1')
                        ->count();

            //print_r( $id); die;
            if( $lessons != 0 )
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please remove the lessons allocated to this category',
                    'lessons_exit' => true
                ], 200);
            }*/



			$category_check = \Validator::make($request, [
				'name' => 'unique:category,name,' . $id
			]);

			$category_status = $category_check->passes();

			Log::info("Category status is ".$category_status);

			if ($category_status == true) {
				$request['user_id'] = Auth::user()->id;
				$category->update($request);

				return Response::json([
					'query_status' => 'success',
					'message' => 'Category Updated Successfully',
					'data' => $category
				], 200);
			}
			else{
				return Response::json([
					'query_status' => 'error',
					'message' => 'Duplicate category name',
				], 200);
			}
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}
	

	public function DeleteCategory($id, Request $request)
	{

		if($this->is_admin() or $this->is_parent())
		{
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$category = Category::findOrFail($id);
			$request = $request->all();
			
			if(	! $request['name'] )
			{
				return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			}

            /*$parent_category = Category::orderBy('id','asc')
                        ->where('name', 'LIKE', "%{$name}%")
                        ->where('enable', 1)
                        ->get();*/

			$lessons = Category::select('childquizallocations.id')
                        ->join('videos', 'videos.category_id', '=', 'category.id')
                        ->join('quizzes', 'quizzes.video_id', '=', 'videos.id')
                        ->join('childquizallocations', 'childquizallocations.quiz_id', '=', 'quizzes.id')
                        ->where('category.parent_cat_id', $id)
                        ->where('category.enable', '1')
                        ->count();

            //print_r( $id); die;
            if( $lessons != 0 )
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please remove the lessons allocated to this category',
                    'lessons_exit' => true
                ], 200);
            }



			$category_check = \Validator::make($request, [
				'name' => 'unique:category,name,' . $id
			]);

			$category_status = $category_check->passes();

			Log::info("Category status is ".$category_status);

			if ($category_status == true) {
				$request['user_id'] = Auth::user()->id;
				$category->update($request);

				return Response::json([
					'query_status' => 'success',
					'message' => 'Category Updated Successfully',
					'data' => $category
				], 200);
			}
			else{
				return Response::json([
					'query_status' => 'error',
					'message' => 'Duplicate category name',
				], 200);
			}
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}

	
	/**
	 * Update the enable in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	/*public function set_enable($id, $enable)
	{
		if($this->is_admin())
		{
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$category = Category::findOrFail($id);
			$request = $request->all();
			
			if(	! $request['name'] )
			{
				return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			}
			
			$request['user_id'] = Auth::user()->id;
	        $category->update($request);
	
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Category Updated Successfully', 
	                'data' => $category 
	        ], 200);
        
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}*/

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{	
		if($this->is_admin())
		{
			Category::destroy($id);
			// return redirect('category');
			return Response::json([
            	'query_status' => 'success',
        		'message' => 'Record successfully deleted!'
            ], 200);
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}

	

}
