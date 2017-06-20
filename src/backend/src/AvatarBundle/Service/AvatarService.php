<?php
namespace AvatarBundle\Service;

use Intervention\Image\ImageManager;

class AvatarService
{
    private $imageManager;

    public function __construct(ImageManager $imageManager)
    {
        $this->imageManager = $imageManager;
    }

    public function getImageManager(): ImageManager
    {
        return $this->imageManager;
    }

}