<?php
namespace PostBundle\Response;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Response\SuccessAttachmentResponse;
use PostBundle\Entity\Post;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use TagBundle\Entity\Tag;
use TagBundle\Response\SuccessTagResponse;
use TagBundle\Response\SuccessTagsResponse;

class SuccessPostResponce extends JsonResponse implements \JsonSerializable
{

    private $entity;

    function __construct(Post $entity = null, bool $isCreated = false)
    {
        $this->entity = $entity;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }


    function jsonSerialize()
    {
        $post = $this->entity ?? $this->createMockEntity();

        return [
            'entity' => [
                'id' => $post->getId(),
                'title' => $post->getTitle(),
                'created' => $post->getCreated(),
                'updated' => $post->getUpdated(),
                'tags'  => (new SuccessTagsResponse($post->getTags()->toArray()))->jsonSerialize(),
                'attachments' => $this->getSuccessAttachmentsResponse($post->getAttachments()),
                'profile' => (new SuccessProfileResponse($post->getProfile()))->jsonSerialize()['entity']
            ]
        ];
    }

    public function getSuccessAttachmentsResponse(array $attachments)
    {

        $entities = array_map(function(Attachment $attachment){
            return (new SuccessAttachmentResponse($attachment))->jsonSerialize();
        }, $attachments);


        return $attachments = [
            'total' => count($entities),
            'entities' => $entities
        ];
    }

    public function createMockEntity(): Post
    {

        $entity = new Post();
        $entity
            ->setTitle('Test POst')
            ->setAttachments([])
            ->setTags([])
            ->setCreated(new \DateTime())
            ->markUpdated()
        ;

        return $entity;
    }

}