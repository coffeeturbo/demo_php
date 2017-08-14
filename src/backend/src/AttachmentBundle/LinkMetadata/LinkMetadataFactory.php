<?php
namespace AttachmentBundle\LinkMetadata;

use AttachmentBundle\LinkMetadata\Types\ImageLinkMetadata;
use AttachmentBundle\LinkMetadata\Types\PageLinkMetadata;
use AttachmentBundle\LinkMetadata\Types\UnknownLinkMetadata;
use AttachmentBundle\LinkMetadata\Types\WebmLinkMetadata;
use AttachmentBundle\LinkMetadata\Types\YoutubeLinkMetadata;
use AttachmentBundle\Parser\OpenGraphParser;

final class LinkMetadataFactory
{
    /** @var OpenGraphParser */
    private $openGraphParser;

    public function __construct(OpenGraphParser $openGraphParser)
    {
        $this->openGraphParser = $openGraphParser;
    }

    public function createLinkMetadata(string $origURL, string $contentType, string $content): LinkMetadata
    {
        $resourceType = $this->getResourceType($origURL, $contentType);

        switch($resourceType) {
            default:
                throw new \Exception(sprintf('Unknown resource type `%s`', $resourceType));

            case YoutubeLinkMetadata::RESOURCE_TYPE:
                return new YoutubeLinkMetadata(
                    $origURL,
                    $this->getOG($origURL, $content),
                    $this->getYouTubeId($origURL)
                );

            // vimeo или другой видео сервис
        }
    }

    private function getResourceType(string $origURL, string $contentType): string
    {
        if($this->testIsYouTube($origURL) && strlen($this->getYouTubeId($origURL))) {
            return YoutubeLinkMetadata::RESOURCE_TYPE;
        }else if($this->test(['text/html', 'application/xml', 'application/xhtml'], $contentType)) {
            return PageLinkMetadata::RESOURCE_TYPE;
        }else if($this->test(['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/bmp'], $contentType)) {
            return ImageLinkMetadata::RESOURCE_TYPE;
        }else if($this->test(['video/webm', 'audio/webm'], $contentType)) {
            return WebmLinkMetadata::RESOURCE_TYPE;
        }else{
            return UnknownLinkMetadata::RESOURCE_TYPE;
        }

    }

    private function testIsYouTube(string $origURL)
    {
        return in_array(parse_url($origURL)['host'] ?? 'localhost', [
            'youtube.com',
            'www.youtube.com',
            'youtu.be',
        ]);
    }

    private function test(array $contentTypes, string $orig)
    {
        foreach($contentTypes as $contentType) {
            if(strpos($orig, $contentType) === 0) {
                return true;
            }
        }

        return false;
    }

    private function getOG(string $origURL, string $content): array
    {
        libxml_use_internal_errors(true);
        $document = new \DOMDocument($content);
        $document->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));
        libxml_clear_errors();

        if($document === false) {
            return [];
        }else{
            return $this->openGraphParser->parse($origURL, $document);
        }
    }

    private function getYouTubeId(string $origURL): string
    {
        preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $origURL, $matches);

        return $matches[1] ?? '';
    }
}