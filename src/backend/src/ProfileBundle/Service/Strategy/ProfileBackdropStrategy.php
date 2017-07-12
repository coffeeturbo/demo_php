<?php
namespace ProfileBundle\Service\Strategy;

use AvatarBundle\Image\BackdropEntity;
use AvatarBundle\Image\Strategy\ImageStrategy;

class ProfileBackdropStrategy extends ImageStrategy
{
    protected $sizes = [
        ''
    ];


    public function __construct(BackdropEntity $entity, string $storageDirPath, string $publicDirPath)
    {
        $this->entity = $entity;
        $this->storageDirPath = $storageDirPath;
        $this->publicDirPath = $publicDirPath;
    }

    public function getSizes()
    {
        return $this->sizes;
    }

    public function getEntity(): BackdropEntity
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

}