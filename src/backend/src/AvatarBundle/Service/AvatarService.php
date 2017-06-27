<?php
namespace AvatarBundle\Service;

use AvatarBundle\Image\Image;
use AvatarBundle\Image\ImageCollection;
use Intervention\Image\Image as ImageLayer;
use AvatarBundle\Image\Strategy\ProfileAvatarStrategy;
use AvatarBundle\Parameter\UploadedImageParameter;
use Intervention\Image\ImageManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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

        // кропаем изображение для аватара
        // генерируем дополнительные изображения
        $imageCollection = new ImageCollection();

        $originImage = $this->getOriginImage($imageParameter, $strategy);

        $imageCollection->addImage($originImage);

        $this->generateStrategyImages($strategy, $originImage, $imageCollection);

        return $imageCollection;
    }



    public function generateStrategyImages(ProfileAvatarStrategy $strategy, Image $image, ImageCollection $collection)
    {
        foreach($strategy->getSizes() as $size){

            $image = $this->generateImageFromPath($image->getStoragePath(), $size, $strategy);

            $collection->addImage($image);
        }
    }

    public function generateImageFromPath($originFilePath, $name, ProfileAvatarStrategy $strategy): Image
    {

        $extension = 'jpg';
        $absolutePath = $strategy->getStorageDirPath();
        $webPath = $strategy->getPublicDirPath();


        $storagePath = sprintf("%s", $absolutePath);

        $imageName = sprintf('%s_%s.%s', $name, uniqid(), $extension);

        $storagedirPath = sprintf('%s/%s', $storagePath, $name);

        $storageFilePath = sprintf('%s/%s', $storagedirPath, $imageName);

        $publicFilePath =  sprintf('%s/%s/%s', $webPath, $name, $imageName);

        if(!file_exists($storagedirPath)) mkdir($storagedirPath);

                $this->imageManager
                    ->make($originFilePath)
                    ->encode($extension, 75)
                    ->resize($name, $name)
                    ->save($storageFilePath);



        $originImage = new Image(
            $storageFilePath,
            $publicFilePath,
            $name
        );

        return $originImage;
    }


    public function resizeImage(): ImageLayer
    {

    }

    public function cropImage(): ImageLayer
    {

    }

    public function getOriginImage(UploadedImageParameter $parameter, ProfileAvatarStrategy $strategy): Image
    {
        $name = 'origin';

        $absolutePath = $strategy->getStorageDirPath();
        $webPath = $strategy->getPublicDirPath();

        $imageName = sprintf('%s_%s.%s', $name, uniqid(), $parameter->getFile()->getClientOriginalExtension());


        $storageFileDirPath = sprintf('%s/%s', $absolutePath, $name);

        $storageFilePath = sprintf('%s/%s', $storageFileDirPath,  $imageName);

        $publicFilePath =  sprintf('%s/%s/%s',  $webPath, $name, $imageName);


//        $parameter->getFile()->move(
//            $storageFileDirPath,
//            $imageName
//        );


        if(!file_exists($storageFileDirPath)) mkdir($storageFileDirPath);

        $this->imageManager
            ->make($parameter->getFile()->getRealPath())
            ->encode($encode = 'jpg', 70)
//            ->crop($parameter->getWidth(), $parameter->getHeight(), $parameter->getStartX(), $parameter->getStartY())
            ->save($storageFilePath);


        $originImage = new Image(
            $storageFilePath,
            $publicFilePath,
            $name
        );
        return $originImage;

    }


}