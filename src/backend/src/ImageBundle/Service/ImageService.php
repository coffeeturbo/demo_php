<?php
namespace ImageBundle\Service;

use AvatarBundle\Image\Strategy\ImageStrategy;
use AvatarBundle\Parameter\UploadedImageParameter;
use ImageBundle\Image\Image;
use Intervention\Image\ImageManager;
use Intervention\Image\Image as ImageLayout;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageService
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

    public function generateImage(string $imagePath,
                                  $name = 'default',
                                  ImageStrategy $strategy,
                                  UploadedImageParameter $parameter = null,
                                  $resize = false): Image
    {

        $absolutePath = $strategy->getStorageDirPath();
        $webPath = $strategy->getPublicDirPath();

        if(!is_dir($absolutePath)) mkdir($absolutePath,0777, true);

        $imageName = sprintf('%s_%s.%s', $name, uniqid(), 'jpg');

        $storageFileDirPath = sprintf('%s/%s', $absolutePath, $name);

        $storageFilePath = sprintf('%s/%s', $storageFileDirPath,  $imageName);

        $publicFilePath =  sprintf('%s/%s/%s',  $webPath, $name, $imageName);

        if(!file_exists($storageFileDirPath)) mkdir($storageFileDirPath);

        $image = $this->imageManager
            ->make($imagePath)
            ->encode($encode = 'jpg', 100)
        ;

        if($parameter){
            $image->crop(
                $parameter->getWidth(),
                $parameter->getHeight(),
                $parameter->getStartX(),
                $parameter->getStartY()
            );
        }

        if($resize) {
            $this->resize($image, $resize, $resize);
        }

        $image->save($storageFilePath);

        $originImage = new Image(
            $storageFilePath,
            $publicFilePath,
            $name
        );

        return $originImage;
    }

    public function resize(ImageLayout $image, int $width, int $height, callable $calback = null): ImageLayout
    {
        return $image->resize($width, $height, $calback);
    }

}