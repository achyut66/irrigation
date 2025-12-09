<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BannerDetails;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index()
     {
         $news = BannerDetails::all()->map(function ($item) {
     
             return [
                 'id' => $item->id,
                 'banner_desc' => $item->banner_desc,
                 'image_url' => $item->image
                     ? asset('storage/banner/' . $item->image)
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
        $news = BannerDetails::find($id);

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
            'banner_desc' => 'required|string|max:255',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/banner', $imageName);
        }

        $news = BannerDetails::create([
            'banner_desc' => $request->banner_desc,
            'image'      => $imageName,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News added successfully',
            'data' => $news
        ]);
    }

    /**
     * Update an existing news record
     */
    public function update(Request $request, $id)
    {
        $news = BannerDetails::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        $request->validate([
            'banner_desc' => 'required|string|max:255',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // If new image uploaded, delete old & store new
        if ($request->hasFile('image')) {
            if ($news->image && Storage::exists('public/banner/' . $news->image)) {
                Storage::delete('public/banner/' . $news->image);
            }

            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/banner', $imageName);
            $news->image = $imageName;
        }

        // Update text fields
        $news->banner_desc = $request->banner_desc;
        $news->save();

        return response()->json([
            'status' => true,
            'message' => 'News updated successfully',
            'data' => $news
        ]);
    }

    /**
     * Delete a news record
     */
    public function destroy($id)
    {
        $news = BannerDetails::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        // Delete image file
        if ($news->image && Storage::exists('public/banner/' . $news->image)) {
            Storage::delete('public/banner/' . $news->image);
        }

        $news->delete();

        return response()->json([
            'status' => true,
            'message' => 'News deleted successfully'
        ]);
    }
}
