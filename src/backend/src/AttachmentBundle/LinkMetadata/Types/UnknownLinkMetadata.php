<?php
namespace AttachmentBundle\LinkMetadata\Types;


use AttachmentBundle\LinkMetadata\LinkMetadata;

final class UnknownLinkMetadata implements LinkMetadata
{
    const VERSION = 1;
    const RESOURCE_TYPE = 'unknown';

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

    public function getVersion(): int
    {
        return self::VERSION;
    }

    public function getURL(): string
    {
        return $this->url;
    }

    public function getResourceType(): string
    {
        return self::RESOURCE_TYPE;
    }


    // todo убрать это гавно
    public function toJSON(array $options = []): array
    {
        return [
            'og' => [
                'basic' => [
                    'title' => '',
                    'description' => '',
                    'url' => $this->getURL(),
                ],
            ],
        ];
    }

    function jsonSerialize()
    {
        return [
            'og' => [
                'basic' => [
                    'title' => '',
                    'description' => '',
                    'url' => $this->getURL(),
                ],
            ],
        ];
    }
}