<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KaryasamitiSetting;

class KaryasamitiController extends Controller
{
    /**
     * Display all news items
     */
    
     public function index()
     {
         $news = KaryasamitiSetting::all()->map(function ($item) {
     
             return [
                 'id' => $item->id,
                 'full_name' => $item->full_name,
                 'designation' => $item->designation,
                 'address' => $item->address,
                 'mobile_no' => $item->mobile_no,
                 'email' => $item->email,
                 'image_url' => $item->image
                     ? asset('storage/karyasamiti/' . $item->image)
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
        $news = KaryasamitiSetting::find($id);

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
            'full_name' => 'required|string|max:255',
            'designation'       => 'required|string',
            'address'       => 'required|string',
            'mobile_no'       => 'required|string',
            'email'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/karyasamiti', $imageName);
        }

        $news = KaryasamitiSetting::create([
            'full_name' => $request->full_name,
            'designation'       => $request->designation,
            'address'       => $request->address,
            'mobile_no'       => $request->mobile_no,
            'email'       => $request->email,
            'image'      => $imageName,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Karyasamiti added successfully',
            'data' => $news
        ]);
    }

    /**
     * Update an existing news record
     */
    public function update(Request $request, $id)
    {
        $news = KaryasamitiSetting::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        $request->validate([
            'full_name' => 'required|string|max:255',
            'designation'       => 'required|string',
            'address'       => 'required|string',
            'mobile_no'       => 'required|string',
            'email'       => 'required|string',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // If new image uploaded, delete old & store new
        if ($request->hasFile('image')) {
            if ($news->image && Storage::exists('public/karyasamiti/' . $news->image)) {
                Storage::delete('public/karyasamiti/' . $news->image);
            }

            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/karyasamiti', $imageName);
            $news->image = $imageName;
        }

        // Update text fields
        $news->full_name = $request->full_name;
        $news->designation = $request->designation;
        $news->address = $request->address;
        $news->mobile_no = $request->mobile_no;
        $news->email = $request->email;
        $news->save();

        return response()->json([
            'status' => true,
            'message' => 'Karyasamiti updated successfully',
            'data' => $news
        ]);
    }

    /**
     * Delete a news record
     */
    public function destroy($id)
    {
        $news = KaryasamitiSetting::find($id);

        if (!$news) {
            return response()->json(['status' => false, 'message' => 'News not found'], 404);
        }

        // Delete image file
        if ($news->image && Storage::exists('public/karyasamiti/' . $news->image)) {
            Storage::delete('public/karyasamiti/' . $news->image);
        }

        $news->delete();

        return response()->json([
            'status' => true,
            'message' => 'Karyasamiti deleted successfully'
        ]);
    }
}