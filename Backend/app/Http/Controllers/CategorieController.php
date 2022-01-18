<?php

namespace App\Http\Controllers;

use App\Http\Models\categorie;
use App\Services\CategorieSevices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    public function get_all()
    {
        $all = categorie::where('categories_id', null)->with('allChildrenCategories')->get();

        return response()->json($all);
    }

    public function get_children($id)
    {
        $children = categorie::where('id', $id)->with('childrenCategories')->get();

        return response()->json($children);
    }

    public function get_parent($id)
    {
        $parent = categorie::where('id', $id)->with('allParentCategories')->get();

        return response()->json($parent);
    }

    public function save_category(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:80'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $category = CategorieSevices::parseCategory($request->all());

        try {
            categorie::create([
                'name' => $category['name'],
                'categories_id' => $category['categories_id']
            ]);
        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['status' => 'error', 'description' => $exception->errorInfo]);
        }

        return response()->json(['status' => 'success', 'description' => 'success']);
    }

    public function update_category(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:80'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $category = CategorieSevices::parseCategory($request->all());

        try {
            $cat = categorie::find($category['id']);
            $cat->name = $category['name'];
            $cat->save();
        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['status' => 'error', 'description' => $exception->errorInfo]);
        }

        return response()->json(['status' => 'success', 'description' => 'success']);
    }
}
