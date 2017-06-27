<?php
namespace AvatarBundle\Image\Strategy;

use AvatarBundle\Image\ImageEntity;

class ProfileAvatarStrategy extends ImageStrategy
{

    protected $sizes = [
        150,
        50
    ];

    public function __construct(ImageEntity $entity, string $storageDirPath, string $publicDirPath)
    {
        $this->entity = $entity;
        $this->storageDirPath = $storageDirPath;
        $this->publicDirPath = $publicDirPath;
    }

    public function getEntity(): ImageEntity
    {
        return $this->entity;
    }

    public function setEntity(ImageEntity $entity)
    {
        $this->entity = $entity;
        return $this;
    }

    public function getSizes()
    {
        return $this->sizes;
    }

}