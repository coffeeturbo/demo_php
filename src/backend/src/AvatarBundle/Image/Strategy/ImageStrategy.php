<?php
namespace AvatarBundle\Image\Strategy;

use AvatarBundle\Image\ImageEntity;

abstract class ImageStrategy
{
    protected $entity;
    protected $storageDirPath;
    protected $publicDirPath;

    public function getStorageDirPath()
    {
        return $this->storageDirPath;
    }

    public function setStorageDirPath($storageDirPath)
    {
        $this->storageDirPath = $storageDirPath;
    }

    public function getPublicDirPath()
    {
        return $this->publicDirPath;
    }

    public function setPublicDirPath($publicDirPath)
    {
        $this->publicDirPath = $publicDirPath;
    }


    abstract public function getEntity(): ImageEntity ;
    abstract public function setEntity(ImageEntity $entity);

}