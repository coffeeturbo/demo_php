<?php
namespace PostBundle\Form\Handler;

use AttachmentBundle\Entity\AttachmentableEntity;
use PostBundle\Entity\Post;
use PostBundle\Service\AttachmentHandler\AttachmentHandler;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use TagBundle\Entity\Tag;
use TagBundle\Tag\TaggableEntityInterface;

class CreatePostDataHandler
{
    private $maxTagsLimit;
    private $maxAttachmentsLimit;

    public function __construct(int $maxTagsLimit, int $maxAttachmentsLimit)
    {
        $this->maxTagsLimit = $maxTagsLimit;
        $this->maxAttachmentsLimit = $maxAttachmentsLimit;
    }

    public function handle(array $data): Post
    {
        $post = $this->createFromData($data);

        return $post;
    }


    private function createFromData(array $data): Post
    {

        $newPost = new Post();

        if(is_null($data['title'])) {
            throw new BadRequestHttpException("field title required");
        }

        $newPost->setTitle($data['title']);

        if($data['tags']) {
            $this->setTagsFromJson($newPost, $data['tags']);
        }

        if($data['attachments']) {
            $this->setAttachmentsFromJson($newPost, $data['attachments']);
        }

        return $newPost;
    }

    private function setTagsFromJson(TaggableEntityInterface $entity, string $jsonTagsString)
    {
        $jsonTags = json_decode($jsonTagsString, true);

        if($this->maxTagsLimit < count($jsonTags)) {
            throw new AccessDeniedHttpException(sprintf("you have exceed tag limit: %s", $this->maxTagsLimit));
        }

        foreach($jsonTags as $tagJson) {
            $tag = new Tag();

            if(is_null($tagJson['entity']['name'])
                || (strlen($tagJson['entity']['name']) === 0)
            ) {
                throw new BadRequestHttpException("field name required");
            }

            $tag->setId($tagJson['entity']['id'] ?? null)->setName($tagJson['entity']['name']);

            if(! $entity->hasTag($tag)) {
                $entity->addTag($tag);
            }
        }

        return $this;
    }

    private function setAttachmentsFromJson(AttachmentableEntity $entity, string $jsonAttachmString)
    {

        $jsonAttachs = json_decode($jsonAttachmString, true);

        if($this->maxAttachmentsLimit < count($jsonAttachs)) {
            throw new AccessDeniedHttpException(
                sprintf("you have exceed attachments limit: %s", $this->maxAttachmentsLimit));
        }


        foreach($jsonAttachs as $attachmentJson) {

            $handler = new AttachmentHandler($attachmentJson);

            $attachment = $handler->getAttachment();

            if(!$entity->hasAttachment($attachment)){
                $entity->addAttachment($attachment);
            }
        }
    }

}