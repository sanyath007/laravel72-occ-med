<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait SaveFile
{
    public function saveFile($file, $destPath = 'uploads/')
    {
        if ($file) {
            $fileName = date('mdYHis') . uniqid(). '.' .$file->getClientOriginalExtension();

            return $file->storeAs($destPath, $fileName, 'public');
        }

        return '';
    }
}
