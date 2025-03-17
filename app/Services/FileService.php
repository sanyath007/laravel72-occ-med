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
        $picNames = '';
        foreach($files as $file) {
            if ($fileName = $this->saveFile($file, $destPath)) {
                $picNames .= ($index < count($files) - 1) ? $fileName.',' : $fileName;
            }

            $index++;
        }

        return $picNames;
    }

    public function uploadImage($file, $destPath)
    {
        return $this->saveFile($file, $destPath);
    }

    public function uploadMultipleImages($files, $destPath)
    {
        $index = 0;
        $picNames = '';
        foreach($files as $file) {
            if ($fileName = $this->saveFile($file, $destPath)) {
                $picNames .= ($index < count($files) - 1) ? $fileName.',' : $fileName;
            }

            $index++;
        }

        return $picNames;
    }
}