<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ReportData;
use Illuminate\Support\Facades\Storage;


class ReportController extends Controller
{
    public function index()
     {
         $news = ReportData::all()->map(function ($item) {
     
             return [
                 'id' => $item->id,
                 'title' => $item->title,
                 'file_url' => $item->report_file
                     ? asset('storage/report/' . $item->report_file)
                     : null,
             ];
         });
     
         return response()->json([
             'status' => true,
             'data' => $news
         ]);
     }

    /**
     * Show a single news record
     */
    public function show($id)
    {
        $news = ReportData::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $news]);
    }

    /**
     * Store a new news record
     */
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'report_file' => 'required|mimes:xls,xlsx|max:5000',
    ]);

    $fileName = time().'_'.$request->file('report_file')->getClientOriginalName();
    $request->file('report_file')->storeAs('public/report', $fileName);

    $news = ReportData::create([
        'title' => $request->title,
        'report_file' => $fileName,
    ]);

    return response()->json([
        'status' => true,
        'message' => 'Report added successfully',
        'data' => $news
    ]);
}

    /**
     * Update an existing news record
     */
    public function update(Request $request, $id)
{
    $news = ReportData::find($id);

    if (!$news) {
        return response()->json(['status' => false, 'message' => 'Report not found'], 404);
    }

    $request->validate([
        'title' => 'required|string|max:255',
        'report_file' => 'nullable|mimes:xls,xlsx|max:5000',
    ]);

    if ($request->hasFile('report_file')) {

        if ($news->report_file && Storage::exists('public/report/' . $news->report_file)) {
            Storage::delete('public/report/' . $news->report_file);
        }

        $fileName = time().'_'.$request->file('report_file')->getClientOriginalName();
        $request->file('report_file')->storeAs('public/report', $fileName);

        $news->report_file = $fileName;
    }

    $news->title = $request->title;
    $news->save();

    return response()->json([
        'status' => true,
        'message' => 'Report updated successfully',
        'data' => $news
    ]);
}


    /**
     * Delete a news record
     */
    public function destroy($id)
{
    $news = ReportData::find($id);

    if (!$news) {
        return response()->json(['status' => false, 'message' => 'Report not found'], 404);
    }

    if ($news->report_file && Storage::exists('public/report/' . $news->report_file)) {
        Storage::delete('public/report/' . $news->report_file);
    }

    $news->delete();

    return response()->json([
        'status' => true,
        'message' => 'Report deleted successfully'
    ]);
}

}
