<?php

namespace App\Services;

class ToolsSevices
{
    public static function parseTool($tool)
    {
        return [
            'mu_id' => $tool['muId'],
            'name' => $tool['name'],
            'description' => $tool['description'],
            'quantity' => $tool['quantity'],
            'cost' => $tool['cost']
        ];
    }
}
