<?php
namespace AvatarBundle\Image;

class Image implements \JsonSerializable
{
    private $storagePath;
    private $publicPath;

    public function __construct(string $storagePath = null, string $publicPath = null)
    {
        $this->storagePath = $storagePath;
        $this->publicPath = $publicPath;
    }

    public function getStoragePath(): string
    {
        return $this->storagePath;
    }

    public function setStoragePath(string $storagePath): self
    {
        $this->storagePath = $storagePath;
        return $this;
    }

    public function getPublicPath(): string
    {
        return $this->publicPath;
    }

    public function setPublicPath(string $publicPath): self
    {
        $this->publicPath = $publicPath;
        return $this;
    }

    function jsonSerialize()
    {
        return [
            'storage_path' => $this->storagePath,
            'public_path' => $this->publicPath
        ];
    }

}