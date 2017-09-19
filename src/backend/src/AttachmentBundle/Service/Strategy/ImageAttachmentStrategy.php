<?php
namespace AttachmentBundle\Service\Strategy;

use AvatarBundle\Image\Strategy\ImageStrategy;

class ImageAttachmentStrategy extends ImageStrategy
{

    public function __construct(string $storageDirPath, string $publicDirPath)
    {
        $this->storageDirPath = $storageDirPath;
        $this->publicDirPath = $publicDirPath;
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

}