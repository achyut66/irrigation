<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\HighlightController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\LawsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\KaryasamitiController;

use App\Models\HighlightNews;
use App\Models\NewsAndArticles;
use App\Models\PlanningDetails;
use App\Models\LawsRules;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// 
Route::post('/login', [AuthenticatedSessionController::class, 'login']);
Route::post('/logout', [AuthenticatedSessionController::class, 'logout'])
     ->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function () {
    return Auth::user();
});


// news and articles routes

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);
Route::post('/news', [NewsController::class, 'store'])->middleware('auth:sanctum');
Route::post('/news/{id}/update', [NewsController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/news/{id}', [NewsController::class, 'destroy'])->middleware('auth:sanctum');

// banner 

Route::get('/banner', [BannerController::class, 'index']);
Route::get('/banner/{id}', [BannerController::class, 'show']);
Route::post('/banner', [BannerController::class, 'store'])->middleware('auth:sanctum');
Route::post('/banner/{id}/update', [BannerController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/banner/{id}', [BannerController::class, 'destroy'])->middleware('auth:sanctum');

// personnel

Route::get('/authority', [PersonnelController::class, 'index']);
Route::get('/authority/{id}', [PersonnelController::class, 'show']);
Route::post('/authority', [PersonnelController::class, 'store'])->middleware('auth:sanctum');
Route::post('/authority/{id}/update', [PersonnelController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/authority/{id}', [PersonnelController::class, 'destroy'])->middleware('auth:sanctum');

// karyasamiti

Route::get('/karyasamiti', [KaryasamitiController::class, 'index']);
Route::get('/karyasamiti/{id}', [KaryasamitiController::class, 'show']);
Route::post('/karyasamiti', [KaryasamitiController::class, 'store'])->middleware('auth:sanctum');
Route::post('/karyasamiti/{id}/update', [KaryasamitiController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/karyasamiti/{id}', [KaryasamitiController::class, 'destroy'])->middleware('auth:sanctum');

// plan and programm

Route::get('/plan', [PlanningController::class, 'index']);
Route::get('/plan/{id}', [PlanningController::class, 'show']);
Route::post('/plan', [PlanningController::class, 'store'])->middleware('auth:sanctum');
Route::post('/plan/{id}/update', [PlanningController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/plan/{id}', [PlanningController::class, 'destroy'])->middleware('auth:sanctum');

// highlight news

Route::get('/highlight', [HighlightController::class, 'index']);
Route::get('/highlight/{id}', [HighlightController::class, 'show']);
Route::post('/highlight', [HighlightController::class, 'store'])->middleware('auth:sanctum');
Route::post('/highlight/{id}/update', [HighlightController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/highlight/{id}', [HighlightController::class, 'destroy'])->middleware('auth:sanctum');

// photoes model

Route::get('/photoes', [PhotoController::class, 'index']);
Route::get('/photoes/{id}', [PhotoController::class, 'show']);
Route::post('/photoes', [PhotoController::class, 'store'])->middleware('auth:sanctum');
Route::post('/photoes/{id}/update', [PhotoController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/photoes/{id}', [PhotoController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/photoesAll', [PhotoController::class,'allImages']);

// report data

Route::get('/report', [ReportController::class, 'index']);
Route::get('/report/{id}', [ReportController::class, 'show']);
Route::post('/report', [ReportController::class, 'store'])->middleware('auth:sanctum');
Route::post('/report/{id}/update', [ReportController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/report/{id}', [ReportController::class, 'destroy'])->middleware('auth:sanctum');
// Route::get('/photoesAll', [ReportController::class,'allImages']);

// laws and rules

Route::get('/rule', [LawsController::class, 'index']);
Route::get('/rule/{id}', [LawsController::class, 'show']);
Route::post('/rule', [LawsController::class, 'store'])->middleware('auth:sanctum');
Route::post('/rule/{id}/update', [LawsController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/rule/{id}', [LawsController::class, 'destroy'])->middleware('auth:sanctum');

// full backend content search

Route::get('/search', function (Request $req) {
    $q = $req->query('q');

    if (!$q) {
        return response()->json([
            'status' => false,
            'message' => 'Search query is required.'
        ], 400);
    }

    $results = [];

    // Search News table
    $results['news'] = NewsAndArticles::where('heading', 'like', "%$q%")
        ->orWhere('news', 'like', "%$q%")
        ->get();

    // Search Planning Details
    $results['planning'] = PlanningDetails::where('title', 'like', "%$q%")
        ->orWhere('description', 'like', "%$q%")
        ->get();

    // Search highlight Members
    $results['highlight'] = HighlightNews::where('title', 'like', "%$q%")
        ->orWhere('highlight_news', 'like', "%$q%")
        ->get();

    // Search laws and rules 
    $results['lawsrules'] = LawsRules::where('title', 'like', "%$q%")
        ->orWhere('description', 'like', "%$q%")
        ->get();

    return response()->json([
        'status' => true,
        'data' => $results
    ]);
});