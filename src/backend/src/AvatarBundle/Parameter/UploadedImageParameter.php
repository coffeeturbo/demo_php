<?php
namespace AvatarBundle\Parameter;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadedImageParameter
{
    private $file;
    private $width;
    private $height;
    private $startX;
    private $startY;

    public function __construct(
        UploadedFile $file,
        int $width = null,
        int $height = null,
        int $startX = null,
        int $startY = null
    ){
        $this->file = $file;
        $this->width = $width;
        $this->height = $height;
        $this->startX = $startX;
        $this->startY = $startY;
    }

    public function getFile(): UploadedFile
    {
        return $this->file;
    }

    public function setFile($file)
    {
        $this->file = $file;
        return $this;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setWidth($width)
    {
        $this->width = $width;
        return $this;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
        return $this;
    }

    public function getStartX()
    {
        return $this->startX;
    }

    public function setStartX($startX)
    {
        $this->startX = $startX;
        return $this;
    }

    public function getStartY()
    {
        return $this->startY;
    }

    public function setStartY($startY)
    {
        $this->startY = $startY;
        return $this;
    }

}