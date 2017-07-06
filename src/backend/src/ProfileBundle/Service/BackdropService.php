<?php
namespace ProfileBundle\Service;

use AvatarBundle\Image\BackdropEntity;
use AvatarBundle\Parameter\UploadedImageParameter;
use ProfileBundle\Service\Strategy\BackdropStrategy;

class BackdropService
{
    public function uploadImage(UploadedImageParameter $imageParameter, BackdropStrategy $strategy)
    {

    }

    public function deleteImage(BackdropEntity $backdropEntity)
    {
        if(file_exists($file = $backdropEntity->getBackdrop())){
            unlink($file);
            $backdropEntity->setBackdrop(null);
        }
        return $backdropEntity;
    }
}