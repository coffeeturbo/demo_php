<?php
namespace AvatarBundle\Image;

class ImageCollection implements \JsonSerializable
{
    private $images = [];

    static public function createFromJson(array $json = null ): self
    {
        $collection = new ImageCollection();

        if(count($json) > 0){
            foreach($json as $item => $value)
            {
                $collection->addImage(new Image($value['storage_path'], $value['public_path'], $item ));
            }
        }
        return $collection;
    }

    public function addImage(Image $image)
    {
        $this->images[$image->getName() ?? null] = $image;

        return $this;
    }

    public function getImages(): array
    {
        return $this->images;
    }

    function jsonSerialize()
    {
        return array_map(function(Image $image){
            return $image->jsonSerialize();
        }, $this->images);
    }

}