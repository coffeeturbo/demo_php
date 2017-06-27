<?php
namespace AvatarBundle\Image;

class ImageCollection implements \JsonSerializable
{
    private $images;

    static public function createFromJson(array $json): self
    {
        $collection = new ImageCollection();

        foreach($json as $item => $value)
        {
            $collection->addImage(new Image($value['storage_path'], $value['public_path'], $item ));
        }

        return $collection;
    }

    public function addImage(Image $image)
    {
        $this->images[$image->getName() ?? null] = $image;

        return $this;
    }

    function jsonSerialize()
    {
// DOTO: Сделать что б работало. Щас "Warning: array_map(): Argument #2 should be an array"
//        return array_map(function(Image $image){
//            return $image->jsonSerialize();
//        }, $this->images);
    }

}