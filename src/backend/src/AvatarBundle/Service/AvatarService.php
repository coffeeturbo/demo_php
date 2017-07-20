<?php
namespace AvatarBundle\Service;

use AvatarBundle\Image\AvatarEntity;
use AvatarBundle\Image\Image;
use AvatarBundle\Image\ImageCollection;
use AvatarBundle\Image\Strategy\ProfileAvatarStrategy;
use AvatarBundle\Parameter\UploadedImageParameter;
use ImageBundle\Service\ImageService;

class AvatarService
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function uploadImage(ProfileAvatarStrategy $strategy, UploadedImageParameter $imageParameter)
    {
        $imageCollection = $this->generateImagesFromFile($imageParameter, $strategy);

        $strategy->getEntity()->setAvatarCollection($imageCollection);
    }

    public function deleteImage(AvatarEntity $avatarEntity)
    {
        if($images = $avatarEntity->getAvatarCollection()->getImages()){
            foreach($images as $index => $image) {
                /**  @var $image Image */
                if(file_exists($file = $image->getStoragePath())){
                    unlink($file);
                }
            }

            $avatarEntity->setAvatarCollection( new ImageCollection() );
        }

        return $avatarEntity;
    }

    public function generateImagesFromFile(UploadedImageParameter $imageParameter, ProfileAvatarStrategy $strategy): ImageCollection
    {
        // сохраняем оригинальное изображение
        $imageCollection = new ImageCollection();

        $originImage = $this->imageService->generateImage(
                            $imageParameter->getFile()->getRealPath(),
                            'origin',
                            $strategy
        );

        $imageCollection->addImage($originImage);

        // кропаем изображение для аватара
        $cropImage = $this->imageService->generateImage(
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

            $resizedImage = $this->imageService->generateImage(
                $image->getStoragePath(),
                $name,
                $strategy,
                null,
                $size
            );

            $collection->addImage($resizedImage);
        }
    }


}