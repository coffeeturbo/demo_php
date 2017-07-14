<?php
namespace ProfileBundle\Service;

use AvatarBundle\Image\BackdropEntity;
use AvatarBundle\Parameter\UploadedImageParameter;
use ImageBundle\Service\ImageService;
use ProfileBundle\Service\Strategy\BackdropStrategy;
use ProfileBundle\Service\Strategy\ProfileBackdropStrategy;

class BackdropService
{

    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function uploadImage(UploadedImageParameter $imageParameter, ProfileBackdropStrategy $strategy)
    {
        $imageParameter->setWidth(1500)->setHeight(300);

        $image = $this->imageService->generateImage($imageParameter->getFile()->getRealPath(),
            null,
            $strategy,
            $imageParameter
        );

        $strategy->getEntity()->setBackdrop($image);
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