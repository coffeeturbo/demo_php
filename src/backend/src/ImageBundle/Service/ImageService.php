<?php
namespace ImageBundle\Service;

use AvatarBundle\Image\Image;
use AvatarBundle\Image\Strategy\ImageStrategy;
use AvatarBundle\Parameter\UploadedImageParameter;
use Intervention\Image\ImageManager;

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
                                  $name,
                                  ImageStrategy $strategy,
                                  UploadedImageParameter $parameter = null,
                                  $resize = false): Image
    {

        $absolutePath = $strategy->getStorageDirPath();
        $webPath = $strategy->getPublicDirPath();

        if(!is_dir($absolutePath)) mkdir($absolutePath);

        $imageName = sprintf('%s_%s.%s', $name, uniqid(), 'jpg');

        $storageFileDirPath = sprintf('%s/%s', $absolutePath, $name);

        $storageFilePath = sprintf('%s/%s', $storageFileDirPath,  $imageName);

        $publicFilePath =  sprintf('%s/%s/%s',  $webPath, $name, $imageName);

        if(!file_exists($storageFileDirPath)) mkdir($storageFileDirPath);

        $image = $this->imageManager
            ->make($imagePath)
            ->encode($encode = 'jpg', 70)
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
            $image->resize((int) $resize, (int) $resize);
        }


        $image->save($storageFilePath);

        $originImage = new Image(
            $storageFilePath,
            $publicFilePath,
            $name
        );
        return $originImage;

    }
}