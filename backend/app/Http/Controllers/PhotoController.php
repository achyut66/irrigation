<?php

namespace App\Http\Controllers;

use App\Models\PhotoDetails;
use Illuminate\Http\Request;
// use App\Models\PhotoImage;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    /**
     * Fetch all photo groups
     */
    public function index()
{
    $items = PhotoDetails::with('images')->get()->map(function ($item) {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'images' => $item->images->map(fn ($img) => asset('storage/photoes/' . $img->image)),
            'image_url' => $item->images->count() > 0
                ? asset('storage/photoes/' . $item->images->first()->image)
                : null,
            'count' => $item->images->count(),
        ];
    });
    return response()->json([
        'status' => true,
        'data' => $items
    ]);
}

// all images

public function allImages()
{
    $images = \App\Models\PhotoImage::all()->map(function ($img) {
        return [
            'id' => $img->id,
            'photo_id' => $img->photo_id, // group id (optional)
            'url' => asset('storage/photoes/' . $img->image),
        ];
    });

    return response()->json([
        'status' => true,
        'data' => $images
    ]);
}


// show funnction
public function show($id)
{
    $gallery = PhotoDetails::with('images')->find($id);

    if (!$gallery) {
        return response()->json(['status' => false, 'message' => 'not found'], 404);
    }

    return response()->json([
        'status' => true,
        'data' => [
            'id' => $gallery->id,
            'title' => $gallery->title,
            'images' => $gallery->images->map(fn ($img) => asset('storage/photoes/' . $img->image)),
        ]
    ]);
}


    /**
     * Create new photo group (multiple images)
     */
    public function store(Request $request)
{
    $request->validate([
        'title'   => 'required|string|max:255',
        'images'  => 'nullable|array',
        'images.*'=> 'image|mimes:jpg,jpeg,png,webp|max:4096',
    ]);

    // 1. Create parent record
    $item = PhotoDetails::create([
        'title' => $request->title,
    ]);

    // 2. Save images in photo_images table
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $file) {
            $imageName = time() . '_' . uniqid() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/photoes', $imageName);

            // Insert into photo_images table
            \App\Models\PhotoImage::create([
                'photo_id' => $item->id,
                'image' => $imageName,
            ]);
        }
    }

    return response()->json([
        'status' => true,
        'message' => 'Photo group created successfully',
        'data' => $item->load('images'),
    ]);
}

    /**
     * Update a photo group
     */
    public function update(Request $request, $id)
    {
        $item = PhotoDetails::find($id);

        if (!$item) {
            return response()->json(['status' => false, 'message' => 'Item not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $updatedImages = $item->images ?? [];

        // If new images uploaded, append them
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $imageName = time() . '_' . uniqid() . '_' . $file->getClientOriginalName();
                $file->storeAs('public/photoes', $imageName);
                $updatedImages[] = $imageName;
            }
        }

        $item->update([
            'title' => $request->title,
            'images' => $updatedImages, // Save merged list
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Photo group updated successfully',
            'data' => $item
        ]);
    }

    /**
     * Delete full photo group
     */
    public function destroy($id)
    {
        $item = PhotoDetails::find($id);

        if (!$item) {
            return response()->json(['status' => false, 'message' => 'Item not found'], 404);
        }

        // Delete all image files
        if ($item->images) {
            foreach ($item->images as $img) {
                if (Storage::exists('public/photoes/' . $img)) {
                    Storage::delete('public/photoes/' . $img);
                }
            }
        }

        $item->delete();

        return response()->json([
            'status' => true,
            'message' => 'Photo group deleted successfully'
        ]);
    }
}
