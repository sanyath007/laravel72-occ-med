<?php

namespace App\Services;

use App\Traits\SaveImage;

class ImageService
{
    use SaveImage;

    public function uploadImage($file, $destPath)
    {
        return $this->saveImage($file, $destPath);
    }

    public function uploadMultipleImage($files, $destPath)
    {
        $index = 0;
        $picNames = '';
        foreach($files as $file) {
            if ($fileName = $this->saveImage($file, $destPath)) {
                $picNames .= ($index < count($files) - 1) ? $fileName.',' : $fileName;
            }

            $index++;
        }

        return $picNames;
    }
}