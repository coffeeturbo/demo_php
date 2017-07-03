<?php
namespace AvatarBundle\Image\Strategy;

use AvatarBundle\Image\AvatarEntity;

class ProfileAvatarStrategy extends ImageStrategy
{

    protected $sizes = [
        'medium' => 150,
        'small' => 50
    ];

    public function __construct(AvatarEntity $entity, string $storageDirPath, string $publicDirPath)
    {
        $this->entity = $entity;
        $this->storageDirPath = $storageDirPath;
        $this->publicDirPath = $publicDirPath;
    }

    public function getEntity(): AvatarEntity
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

    public function getSizes()
    {
        return $this->sizes;
    }

}