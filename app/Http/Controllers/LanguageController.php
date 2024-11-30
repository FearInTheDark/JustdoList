<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\File;

class LanguageController extends Controller {
    public function language(string $lang) {
        $file = public_path('lang/' . $lang . '.json');
        if (!file_exists($file)) {
            return response()->json(['error' => 'Language file not found'], 404);
        }
        return response()->json(json_decode(File::get($file)));
    }
}
