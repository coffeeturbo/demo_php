<?php
namespace ProfileBundle\Service;

use AvatarBundle\Parameter\UploadedImageParameter;
use ImageBundle\Image\BackdropEntity;
use ImageBundle\Image\Image;
use ImageBundle\Service\ImageService;
use ProfileBundle\Service\Strategy\ProfileBackdropStrategy;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BackdropService
{
    private $imageService;
    private $backdropPresets;

    public function __construct(ImageService $imageService, array $backdropPresets)
    {
        $this->imageService = $imageService;

        array_walk($backdropPresets, function(&$preset, $id){
            $preset = new Image($preset['absolute_path'], $preset['web_path'], $id);
        });

        $this->backdropPresets = $backdropPresets;
    }


    public function uploadImage(UploadedImageParameter $imageParameter, ProfileBackdropStrategy $strategy)
    {
        $imageParameter->setWidth(1500)->setHeight(300);

        $image = $this->imageService->generateImage($imageParameter->getFile()->getRealPath(),
            null,
            $strategy,
            $imageParameter
        );

        $strategy->getEntity()->setBackdrop($image);
    }

    private function deleteImage(BackdropEntity $backdropEntity)
    {
        if($file = $backdropEntity->getBackdrop())
        {
            if(file_exists($file->getStoragePath())){
                unlink($file->getStoragePath());

            }
        }
        return $backdropEntity->setBackdrop(null);
    }


    public function getProfileBackdropPresets(): array
    {
        return $this->backdropPresets;
    }

    public function getProfileBackdropPreset(int $presetId): Image
    {
        if(!isset($this->backdropPresets[$presetId])) throw new NotFoundHttpException();

        return $this->backdropPresets[$presetId];
    }

    private function isPreset(?Image $image): bool
    {
        return in_array($image, $this->backdropPresets);
    }

    public function setBackdrop(BackdropEntity $backdropEntity, Image $image)
    {
        $this->deleteBackdrop($backdropEntity);

        $backdropEntity->setBackdrop($image);
    }

    public function deleteBackdrop(BackdropEntity $backdropEntity)
    {
        if($this->isPreset($backdropEntity->getBackdrop())){
            $backdropEntity->setBackdrop(null);
        } else {
            $this->deleteImage($backdropEntity);
        }
    }

}