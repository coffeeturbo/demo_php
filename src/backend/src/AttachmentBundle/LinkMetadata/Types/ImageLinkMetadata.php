<?php
namespace AttachmentBundle\LinkMetadata\Types;

use AttachmentBundle\LinkMetadata\LinkMetadata;

final class ImageLinkMetadata implements LinkMetadata
{
    const RESOURCE_TYPE = 'image';

    /** @var string */
    private $url;

    public function __construct(string $url)
    {
        $this->url = $url;
    }

    public function getTitle(): string
    {
        return basename($this->url);
    }

    public function getDescription(): string
    {
        return '';
    }

    public function getURL(): string
    {
        return $this->url;
    }

    public function getResourceType(): string
    {
        return self::RESOURCE_TYPE;
    }

    function jsonSerialize()
    {
        return [
            'preview' => $this->getURL(),
        ];
    }
}