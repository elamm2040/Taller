<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];
}
