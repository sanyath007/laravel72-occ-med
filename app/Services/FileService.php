<?php

namespace App\Services;

use App\Traits\SaveFile;

class FileService
{
    use SaveFile;

    public function uploadFile($file, $destPath)
    {
        return $this->saveFile($file, $destPath);
    }

    public function uploadMultipleFiles($files, $destPath)
    {
        $index = 0;
        $arrFiles = [];
        foreach($files as $file) {
            if ($fileName = $this->saveFile($file, $destPath)) {
                array_push($arrFiles, $fileName);
            }

            $index++;
        }

        return $arrFiles;
    }

    public function uploadImage($image, $destPath)
    {
        return $this->saveFile($image, $destPath);
    }

    public function uploadMultipleImages($images, $destPath)
    {
        $index = 0;
        $arrImages = [];
        foreach($images as $image) {
            if ($fileName = $this->saveFile($image, $destPath)) {
                array_push($arrImages, $fileName);
            }

            $index++;
        }

        return $arrImages;
    }
}