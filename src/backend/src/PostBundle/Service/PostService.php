<?php
namespace PostBundle\Service;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Entity\AttachmentableEntity;
use PostBundle\Entity\Post;
use PostBundle\Repository\PostRepository;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use TagBundle\Entity\Tag;
use TagBundle\Tag\TaggableEntityInterface;

class PostService
{

    private $postRepository;
    private $maxTagsLimit;
    private $maxAttachmentsLimit;

    public function __construct(
        PostRepository $postRepository,
        int $maxTagsLimit,
        int $maxAttachmentsLimit
    )
    {
        $this->postRepository = $postRepository;
        $this->maxTagsLimit = $maxTagsLimit;
        $this->maxAttachmentsLimit = $maxAttachmentsLimit;
    }

    public function createFromData(array $data): Post
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

        $this->create($newPost);

        return $newPost;
    }

    public function create(Post $post): Post
    {
        $this->postRepository->save($post);

        return $post;
    }

    public function setTagsFromJson(TaggableEntityInterface $entity, string $jsonTagsString)
    {
        $jsonTags = json_decode($jsonTagsString, true);

        if($this->maxTagsLimit < count($jsonTags)) {
            throw new AccessDeniedHttpException(sprintf("you have exceed tag limit: %s", $this->maxTagsLimit));
        }

        foreach($jsonTags as $tagJson) {
            $tag = new Tag;

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

    public function setAttachmentsFromJson(AttachmentableEntity $entity, string $jsonAttachmString)
    {
        $jsonAttachs = json_decode($jsonAttachmString, true);

        if($this->maxAttachmentsLimit < count($jsonAttachs)) {
            throw new AccessDeniedHttpException(sprintf("you have exceed attachments limit: %s", $this->maxAttachmentsLimit));
        }

        foreach($jsonAttachs as $attachmentJson) {


            $attachment = new Attachment();


            $attachment->setType()->setContent();

            if(is_null($attachmentJson['entity']['name'])
                || (strlen($attachmentJson['entity']['name']) === 0)
            ) {
                throw new BadRequestHttpException("field name required");
            }

            if(!$entity->hasAttachment($attachment)){
                $entity->hasAttachment($attachment);
            }

        }
    }
}