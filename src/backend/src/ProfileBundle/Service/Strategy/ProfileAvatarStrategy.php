<?php
namespace ProfileBundle\Service\Strategy;

use AvatarBundle\Image\AvatarEntity;
use AvatarBundle\Image\Strategy\ImageStrategy;
use AvatarBundle\Parameter\UploadedImageParameter;
use ImageBundle\Image\Image;
use ImageBundle\Image\ImageCollection;
use ImageBundle\Service\ImageService;

class ProfileAvatarStrategy extends ImageStrategy
{

    protected $sizes = [
        'medium' => 150,
        'small' => 50
    ];

    /** @var  ImageService */
    protected $imageService;


    public function __construct(string $storageDirPath, string $publicDirPath)
    {
        $this->storageDirPath = $storageDirPath;
        $this->publicDirPath = $publicDirPath;
    }

    public function setImageService(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function getEntity(): AvatarEntity
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

    public function getSizes()
    {
        return $this->sizes;
    }


    public function generateImage(AvatarEntity $entity, UploadedImageParameter $imageParameter)
    {
        $imageCollection = $this->generateImagesFromFile($imageParameter);

        $entity->setAvatarCollection($imageCollection);
    }

    private function generateImagesFromFile(UploadedImageParameter $imageParameter): ImageCollection
    {
        // сохраняем оригинальное изображение
        $imageCollection = new ImageCollection();

        $originImage = $this->imageService->generateImage(
            $imageParameter->getFile()->getRealPath(),
            'origin',
            $this
        );

        $imageCollection->addImage($originImage);

        // кропаем изображение для аватара
        $cropImage = $this->imageService->generateImage(
            $imageParameter->getFile()->getRealPath(),
            'cropped',
            $this,
            $imageParameter
        );

        $imageCollection->addImage($cropImage);

        // генерируем дополнительные изображения
        $this->generateStrategyImages($this, $cropImage, $imageCollection);

        return $imageCollection;
    }

    private function generateStrategyImages(ProfileAvatarStrategy $strategy, Image $image, ImageCollection $collection)
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