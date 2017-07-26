<?php
namespace AvatarBundle\Service;

use AvatarBundle\Image\AvatarEntity;
use AvatarBundle\Parameter\UploadedImageParameter;
use ImageBundle\Image\Image;
use ImageBundle\Image\ImageCollection;
use ImageBundle\Service\ImageService;
use ProfileBundle\Service\Strategy\ProfileAvatarStrategy;

class AvatarService
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function uploadImage(ProfileAvatarStrategy $strategy, UploadedImageParameter $imageParameter)
    {
        $strategy->generateImage($imageParameter );
    }

    public function deleteImage(AvatarEntity $avatarEntity)
    {
        if($images = $avatarEntity->getAvatarCollection()->getImages()){
            foreach($images as $index => $image) {
                /**  @var $image Image */
                if(file_exists($file = $image->getStoragePath())){
                    unlink($file);
                }
            }
            $avatarEntity->setAvatarCollection( new ImageCollection() );
        }
        return $avatarEntity;
    }

}