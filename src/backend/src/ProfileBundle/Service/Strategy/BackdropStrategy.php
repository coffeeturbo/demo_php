<?php
namespace ProfileBundle\Service\Strategy;

use AvatarBundle\Image\BackdropEntity;
use AvatarBundle\Image\Strategy\ImageStrategy;
use Intervention\Image\Image;

class BackdropStrategy extends ImageStrategy
{

    public function __construct(BackdropEntity $entity, string $storageDirPath, string $publicDirPath)
    {
        $this->entity = $entity;
        $this->storageDirPath = $storageDirPath;
        $this->publicDirPath = $publicDirPath;
    }


    public function getSizes()
    {
        // TODO: Implement getSizes() method.
    }

    public function getEntity()
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

    public function resize(Image $image){

    }

}