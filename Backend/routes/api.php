<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\MeasurementUnitController;
use App\Http\Controllers\ToolsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [UserController::class, 'store']);
Route::post('login', [AuthController::class, 'authenticate']);
Route::post('stillin', [AuthController::class, 'getAuthenticatedUser']);
Route::post('logout', [AuthController::class, 'logout'])->middleware(['jwt.verify']);

Route::prefix('categories')->middleware(['jwt.verify'])->group(function () {
    Route::get('all', [CategorieController::class, 'get_all']);
    Route::get('children/{id}', [CategorieController::class, 'get_children']);
    Route::get('parent/{id}', [CategorieController::class, 'get_parent']);
    Route::post('save', [CategorieController::class, 'save_category']);
    Route::post('update', [CategorieController::class, 'update_category']);
});

Route::prefix('mu')->middleware(['jwt.verify'])->group(function () {
    Route::get('all', [MeasurementUnitController::class, 'get_all']);
    Route::get('{id}', [MeasurementUnitController::class, 'get_mu']);
    Route::post('save', [MeasurementUnitController::class, 'save_mu']);
    Route::post('update', [MeasurementUnitController::class, 'update_mu']);
});

Route::prefix('tools')->middleware(['jwt.verify'])->group(function () {
    Route::get('all', [ToolsController::class, 'get_all']);
    Route::get('{id}', [ToolsController::class, 'get_tool']);
    Route::post('save', [ToolsController::class, 'save_tool']);
    Route::post('update', [ToolsController::class, 'update_tool']);
});
