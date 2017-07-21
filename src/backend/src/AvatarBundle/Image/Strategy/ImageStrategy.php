<?php
namespace AvatarBundle\Image\Strategy;

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

    abstract public function getSizes();

    abstract public function getEntity() ;
    abstract public function setEntity($entity);

}