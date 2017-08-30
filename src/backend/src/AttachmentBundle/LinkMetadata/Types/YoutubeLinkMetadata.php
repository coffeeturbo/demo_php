<?php
namespace AttachmentBundle\LinkMetadata\Types;


use AttachmentBundle\LinkMetadata\LinkMetadata;

final class YoutubeLinkMetadata implements LinkMetadata
{
    const RESOURCE_TYPE = 'youtube';

    /** @var string */
    private $url;

    /** @var array */
    private $openGraph;

    /** @var string */
    private $youTubeId;

    private $content;

    public function __construct(string $url, array $openGraph, string $content)
    {
        $this->youTubeId = $this->getYouTubeId($url);
        $this->url = $url;
        $this->openGraph = $openGraph;
        $this->content = $content;
    }

    private function getYouTubeId(string $origURL): string
    {
        preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $origURL, $matches);

        return $matches[1] ?? '';
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

    public function getURL(): string
    {
        return $this->url;
    }

    public function getResourceType(): string
    {
        return self::RESOURCE_TYPE;
    }

    public function getId()
    {
        return $this->youTubeId;
    }


    public function getDuration()
    {
        libxml_use_internal_errors(true);
        $document = new \DOMDocument($this->content);
        $document->loadHTML(mb_convert_encoding($this->content, 'HTML-ENTITIES', 'UTF-8'));
        libxml_clear_errors();

        $metas = $document->getElementsByTagName('meta');

        $str_value='';
        for($i = 0; $i < $metas->length; $i++){
            $node = $metas->item($i);

            $attr = $node->attributes->getNamedItem('itemprop');

            if($attr && $attr->nodeValue == 'duration'){
                $str_value = $node->attributes->getNamedItem('content')->nodeValue;
            }
        }


        $dateInterval = new \DateInterval($str_value);

        // переводим в секунды
        $reference = new \DateTimeImmutable;
        $endTime = $reference->add($dateInterval);

        return $endTime->getTimestamp() - $reference->getTimestamp();
    }

    public function getImage()
    {
        return $this->openGraph['basic']['image']?? '';
    }


    function jsonSerialize()
    {
        return [
            'youtubeId' => $this->youTubeId,
            'url' => $this->url,
            'duration' => $this->getDuration(),
            'title' => $this->getTitle(),
            'description' => $this->getDescription(),
            'image' => $this->getImage()
        ];
    }
}