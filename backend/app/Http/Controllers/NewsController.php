<?php

namespace App\Http\Controllers;

use App\Models\NewsAndArticles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Display all news items
     */
    
     public function index()
     {
         $news = NewsAndArticles::all()->map(function ($item) {
     
             return [
                 'id' => $item->id,
                 'heading' => $item->heading,
                 'news' => $item->news,
                 'created_at' => $item->created_at,
                 'image_url' => $item->image
                     ? asset('storage/news/' . $item->image)
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
        $news = NewsAndArticles::find($id);

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
            'heading' => 'required|string|max:255',
            'news'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/news', $imageName);
        }

        $news = NewsAndArticles::create([
            'heading' => $request->heading,
            'news'       => $request->news,
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
        $news = NewsAndArticles::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        $request->validate([
            'heading' => 'required|string|max:255',
            'news'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // If new image uploaded, delete old & store new
        if ($request->hasFile('image')) {
            if ($news->image && Storage::exists('public/news/' . $news->image)) {
                Storage::delete('public/news/' . $news->image);
            }

            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/news', $imageName);
            $news->image = $imageName;
        }

        // Update text fields
        $news->heading = $request->heading;
        $news->news = $request->news;
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
        $news = NewsAndArticles::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        // Delete image file
        if ($news->image && Storage::exists('public/news/' . $news->image)) {
            Storage::delete('public/news/' . $news->image);
        }

        $news->delete();

        return response()->json([
            'status' => true,
            'message' => 'News deleted successfully'
        ]);
    }
}
