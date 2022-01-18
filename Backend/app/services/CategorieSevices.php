<?php

namespace App\Services;

class CategorieSevices
{
    public static function parseCategory($category)
    {
        return [
            'id' => $category['id'],
            'name' => $category['name'],
            'categories_id' => $category['categoriesId']
        ];
    }
}
