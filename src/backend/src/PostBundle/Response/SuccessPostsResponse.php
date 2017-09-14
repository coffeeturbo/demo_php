<?php
namespace PostBundle\Response;

use PostBundle\Entity\Post;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessPostsResponse extends JsonResponse implements \JsonSerializable
{
    private $entities;

    function __construct(array $entities = null, bool $isCreated = false)
    {
        $this->entities = $entities;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }


    function jsonSerialize()
    {
        $posts = $this->entities ?? $this->createMockEntity();


        $entities = array_map(function(Post $post){
            return (new SuccessPostResponce($post))->jsonSerialize();
        }, $posts );

        return [
            'total' => count($entities),
            'entities' => $entities
        ];
    }

//    public function getSuccessAttachmentsResponse(array $attachments)
//    {
//
//        $entities = array_map(function(Attachment $attachment){
//            return (new SuccessAttachmentResponse($attachment))->jsonSerialize();
//        }, $attachments);
//
//
//        return $attachments = [
//            'total' => count($entities),
//            'entities' => $entities
//        ];
//    }

    public function createMockEntity(): array
    {

        return [];
    }
}