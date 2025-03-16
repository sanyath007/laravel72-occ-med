<?php

namespace App\Services;

// use App\Models\
use App\Traits\SaveImage;

class ImageService
{
    use SaveImage;

    public function updateImage($id, $image)
    {
        $asset = $this->assetRepo->getAsset($id);
        $destPath = 'assets';

        /** Remove old uploaded file */
        if (\File::exists($destPath . $asset->img_url)) {
            \File::delete($destPath . $asset->img_url);
        }

        $asset->img_url = $this->saveImage($image, $destPath);

        if (!empty($asset->img_url) && $asset->save()) {
            return $asset;
        } else {
            return false;
        }
    }
}