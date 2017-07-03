<?php
namespace AvatarBundle\Service;

use AvatarBundle\Image\Image;
use AvatarBundle\Image\ImageCollection;
use AvatarBundle\Image\Strategy\ProfileAvatarStrategy;
use AvatarBundle\Parameter\UploadedImageParameter;
use Intervention\Image\ImageManager;

class AvatarService
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

    public function uploadImage(ProfileAvatarStrategy $strategy, UploadedImageParameter $imageParameter)
    {
        $imageCollection = $this->generateImagesFromFile($imageParameter, $strategy);

        $strategy->getEntity()->setImages($imageCollection);
    }

    public function generateImagesFromFile(UploadedImageParameter $imageParameter, ProfileAvatarStrategy $strategy): ImageCollection
    {
        // сохраняем оригинальное изображение
        $imageCollection = new ImageCollection();

        $originImage = $this->generateImage(
                            $imageParameter->getFile()->getRealPath(),
                            'origin',
                            $strategy
        );

        $imageCollection->addImage($originImage);

        // кропаем изображение для аватара
        $cropImage = $this->generateImage(
            $imageParameter->getFile()->getRealPath(),
            'cropped',
            $strategy,
            $imageParameter
        );

        $imageCollection->addImage($cropImage);

        // генерируем дополнительные изображения
        $this->generateStrategyImages($strategy, $cropImage, $imageCollection);

        return $imageCollection;
    }

    public function generateStrategyImages(ProfileAvatarStrategy $strategy, Image $image, ImageCollection $collection)
    {
        foreach($strategy->getSizes() as $name => $size){

            $resizedImage = $this->generateImage(
                $image->getStoragePath(),
                $name,
                $strategy,
                null,
                $size
            );

            $collection->addImage($resizedImage);
        }
    }

    public function generateImage(string $imagePath,
                                  $name,
                                  ProfileAvatarStrategy $strategy,
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