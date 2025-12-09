<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LawsRules;
use Illuminate\Support\Facades\Storage;

class LawsController extends Controller
{
    public function index()
    {
        $news = LawsRules::all()->map(function ($item) {

            return [
                'id' => $item->id,
                'title' => $item->title,
                'description' => $item->description,
                'created_at' => $item->created_at,
                'image_url' => $item->image
                    ? asset('storage/laws/' . $item->image)
                    : null,
            ];
        });

        return response()->json([
            'status' => true,
            'data' => $news
        ]);
    }

    public function show($id)
    {
        $news = LawsRules::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'Record not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $news]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/laws', $imageName);
        }

        $news = LawsRules::create([
            'title'       => $request->title,
            'description' => $request->description,
            'image'       => $imageName,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Added successfully',
            'data'    => $news
        ]);
    }

    public function update(Request $request, $id)
    {
        $news = LawsRules::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'Record not found'], 404);
        }

        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // If new image uploaded → delete old & save new
        if ($request->hasFile('image')) {
            if ($news->image && Storage::exists('public/laws/' . $news->image)) {
                Storage::delete('public/laws/' . $news->image);
            }

            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/laws', $imageName);
            $news->image = $imageName;
        }

        $news->title = $request->title;
        $news->description = $request->description;
        $news->save();

        return response()->json([
            'status'  => true,
            'message' => 'Updated successfully',
            'data'    => $news
        ]);
    }

    public function destroy($id)
    {
        $news = LawsRules::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'Record not found'], 404);
        }

        if ($news->image && Storage::exists('public/laws/' . $news->image)) {
            Storage::delete('public/laws/' . $news->image);
        }

        $news->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Deleted successfully'
        ]);
    }
}
