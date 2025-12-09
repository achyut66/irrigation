<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PlanningDetails;
use Illuminate\Support\Facades\Storage;


class PlanningController extends Controller
{
    /**
     * Display all news items
     */
    
     public function index()
     {
         $news = PlanningDetails::all()->map(function ($item) {
     
             return [
                 'id' => $item->id,
                 'title' => $item->title,
                 'description' => $item->description,
                 'image_url' => $item->image
                     ? asset('storage/plan/' . $item->image)
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
        $news = PlanningDetails::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'planning not found'], 404);
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
            'description'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/plan', $imageName);
        }

        $news = PlanningDetails::create([
            'title' => $request->title,
            'description'       => $request->description,
            'image'      => $imageName,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Added successfully',
            'data' => $news
        ]);
    }

    /**
     * Update an existing news record
     */
    public function update(Request $request, $id)
    {
        $news = PlanningDetails::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // If new image uploaded, delete old & store new
        if ($request->hasFile('image')) {
            if ($news->image && Storage::exists('public/plan/' . $news->image)) {
                Storage::delete('public/plan/' . $news->image);
            }

            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/plan', $imageName);
            $news->image = $imageName;
        }

        // Update text fields
        $news->title = $request->title;
        $news->description = $request->description;
        $news->save();

        return response()->json([
            'status' => true,
            'message' => 'Updated successfully',
            'data' => $news
        ]);
    }

    /**
     * Delete a news record
     */
    public function destroy($id)
    {
        $news = PlanningDetails::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        // Delete image file
        if ($news->image && Storage::exists('public/plan/' . $news->image)) {
            Storage::delete('public/plan/' . $news->image);
        }

        $news->delete();

        return response()->json([
            'status' => true,
            'message' => 'Deleted successfully'
        ]);
    }
}

