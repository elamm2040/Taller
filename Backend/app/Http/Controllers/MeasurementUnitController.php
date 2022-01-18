<?php

namespace App\Http\Controllers;

use App\Http\Models\mu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MeasurementUnitController extends Controller
{
    public function get_all()
    {
        $all = mu::all();

        return response()->json($all);
    }

    public function get_mu($id)
    {
        $mu = mu::where('id', $id)->get();

        return response()->json($mu);
    }

    public function save_mu(Request $request)
    {
        $mus = $request->all();

        try {
            DB::beginTransaction();
            foreach ($mus as $key => $mu) {
                mu::create([
                    'name' => $mu['name'],
                    'description' => $mu['description']
                ]);
            }
            DB::commit();
        } catch (\Illuminate\Database\QueryException $exception) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'description' => $exception->errorInfo]);
        }

        return response()->json(['status' => 'success', 'description' => 'success']);
    }

    public function update_mu(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:80'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        try {
            $mu = mu::find($request->get('id'));
            $mu->name = $request->get('name');
            $mu->description = $request->get('description');
            $mu->save();
        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['status' => 'error', 'description' => $exception->errorInfo]);
        }

        return response()->json(['status' => 'success', 'description' => 'success']);
    }
}
