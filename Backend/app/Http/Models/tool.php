<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tool extends Model
{
    use HasFactory;

    protected $fillable = [
        'mu_id',
        'name',
        'description',
        'quantity',
        'cost'
    ];

    public function muId()
    {
        return $this->hasOne(mu::class, 'id', 'mu_id');
    }
}
