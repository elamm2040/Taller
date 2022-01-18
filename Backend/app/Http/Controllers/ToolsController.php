<?php

namespace App\Http\Controllers;

use App\Http\Models\tool;
use App\Services\ToolsSevices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ToolsController extends Controller
{
    public function get_all()
    {
        $all = tool::with(['muId'])->get();

        return response()->json($all);
    }

    public function get_tool($id)
    {
        $mu = tool::where('id', $id)->with(['muId'])->get();

        return response()->json($mu);
    }

    public function save_tool(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'muId' => 'required|numeric',
            'name' => 'required|string|max:80',
            'description' => 'required|string|max:80',
            'quantity' => 'required|numeric',
            'cost' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $tool = ToolsSevices::parseTool($request->all());

        try {
            tool::create([
                'mu_id' => $tool['mu_id'],
                'name' => $tool['name'],
                'description' => $tool['description'],
                'quantity' => $tool['quantity'],
                'cost' => $tool['cost']
            ]);
        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['status' => 'error', 'description' => $exception->errorInfo]);
        }

        return response()->json(['status' => 'success', 'description' => 'success']);
    }

    public function update_tool(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:80'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        try {
            $mu = tool::find($request->get('id'));
            $mu->name = $request->get('name');
            $mu->description = $request->get('description');
            $mu->save();
        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['status' => 'error', 'description' => $exception->errorInfo]);
        }

        return response()->json(['status' => 'success', 'description' => 'success']);
    }
}
