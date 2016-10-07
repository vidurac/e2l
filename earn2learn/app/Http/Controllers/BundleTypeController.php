<?php

namespace App\Http\Controllers;

use App\BundleType;
use App\Http\Requests;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Response;
use Session;

class BundleTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id=NULL)
    {
        return Response::json([
            'error' => 'access_denied',
            'message' => 'unauthorized access blocked'
        ], 401);
    }

    /**
     * @return mixed
     */
    public function getAllBundleType()
    {
        $bundleType = BundleType::latest()
            ->select('bundle_types.*')
            ->get();

        if (!$bundleType->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $bundleType
        ], 200);
    }

}
