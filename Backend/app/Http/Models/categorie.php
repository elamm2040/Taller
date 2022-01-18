<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'categories_id'
    ];

    public function childrenCategories()
    {
        return $this->hasMany(categorie::class, 'categories_id', 'id');
    }

    public function parentCategories()
    {
        return $this->hasMany(categorie::class, 'id', 'categories_id');
    }

    public function allChildrenCategories()
    {
        return $this->childrenCategories()->with('allChildrenCategories');
    }

    public function allParentCategories()
    {
        return $this->parentCategories()->with('allParentCategories');
    }
}
