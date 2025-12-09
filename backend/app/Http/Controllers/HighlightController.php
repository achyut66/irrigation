<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HighlightNews;
use Illuminate\Support\Facades\Storage;


class HighlightController extends Controller
{
    /**
     * Display all news items
     */
    
     public function index()
     {
         $news = HighlightNews::all()->map(function ($item) {
     
             return [
                 'id' => $item->id,
                 'title' => $item->title,
                 'highlight_news' => $item->highlight_news,
                 'created_at' => $item->created_at,
                 'image_url' => $item->image
                     ? asset('storage/highlight/' . $item->image)
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
        $news = HighlightNews::find($id);

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
            'highlight_news'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/highlight', $imageName);
        }

        $news = HighlightNews::create([
            'title' => $request->title,
            'highlight_news'       => $request->highlight_news,
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
        $news = HighlightNews::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'highlight_news'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // If new image uploaded, delete old & store new
        if ($request->hasFile('image')) {
            if ($news->image && Storage::exists('public/highlight/' . $news->image)) {
                Storage::delete('public/highlight/' . $news->image);
            }

            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/highlight', $imageName);
            $news->image = $imageName;
        }

        // Update text fields
        $news->title = $request->title;
        $news->highlight_news = $request->highlight_news;
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
        $news = HighlightNews::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        // Delete image file
        if ($news->image && Storage::exists('public/highlight/' . $news->image)) {
            Storage::delete('public/highlight/' . $news->image);
        }

        $news->delete();

        return response()->json([
            'status' => true,
            'message' => 'News deleted successfully'
        ]);
    }
}