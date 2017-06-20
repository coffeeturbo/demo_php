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
            $collection->addImage(new Image($value['storage_path'], $value['public_path']));
        }

        return $collection;
    }

    public function addImage(Image $image)
    {
        $this->images[] = $image;
    }

    function jsonSerialize()
    {
        return array_map(function(Image $image){
            return $image->jsonSerialize();
        }, $this->images);
    }

}