<?php
namespace AttachmentBundle\LinkMetadata\Types;


use AttachmentBundle\LinkMetadata\LinkMetadata;

final class PageLinkMetadata implements LinkMetadata
{
    const RESOURCE_TYPE = 'page';
    const VERSION = 1;

    /** @var string */
    private $url;

    /** @var array */
    private $openGraph;

    public function __construct(string $url, array $openGraph)
    {
        $this->url = $url;
        $this->openGraph = $openGraph;
    }

    public function getTitle(): string
    {
        $og = $this->openGraph;

        $hasBasicTitle = isset($og['basic']['title']) && strlen($og['basic']['title']);
        $hasOGBasicTitle = isset($og['og']['basic']['og:title']) && strlen($og['og']['basic']['og:title']);

        if($hasOGBasicTitle) {
            return $og['og']['basic']['og:title'];
        }else if($hasBasicTitle) {
            return $og['basic']['title'];
        }else{
            return '';
        }
    }

    public function getDescription(): string
    {
        $og = $this->openGraph;

        $hasBasicDescription = isset($og['basic']['description']) && strlen($og['basic']['description']);
        $hasOGBasicDescription = isset($og['og']['basic']['og:description']) && strlen($og['og']['basic']['og:description']);

        if($hasOGBasicDescription) {
            return $og['og']['basic']['og:description'];
        }else if($hasBasicDescription) {
            return $og['basic']['description'];
        }else{
            return '';
        }
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
            'og' => $this->openGraph,
        ];
    }

    function jsonSerialize()
    {
        return [
            'og' => $this->openGraph,
        ];
    }
}