<?php
namespace PostBundle\Formatter;

use AppBundle\Formatter\Formatter;
use AttachmentBundle\Response\SuccessAttachmentsResponse;
use PostBundle\Entity\Post;
use ProfileBundle\Response\SuccessProfileResponse;
use TagBundle\Response\SuccessTagsResponse;

class PostFormatter extends Formatter
{
    function format()
    {
        if($this->resource instanceof Post){
            return [
                'id' => $this->resource->getId(),
                'title' => $this->resource->getTitle(),
                'created' => $this->resource->getCreated()->format(\DateTime::W3C),
                'updated' => $this->resource->getUpdated()->format(\DateTime::W3C),
                'tags'  => (new SuccessTagsResponse($this->resource->getTags()->toArray()))->jsonSerialize(),
                'attachments' =>  (new SuccessAttachmentsResponse($this->resource->getAttachments()))->jsonSerialize(),
                'profile' => (new SuccessProfileResponse($this->resource->getProfile()))->jsonSerialize()['entity'],

                'comments_total' => $this->resource->getCommentsTotal(),

                'votes' => [
                    'state' =>  $this->resource->getVote() ? $this->resource->getVote()->getType()->getStringCode() :'none',
                    'rating' => $this->resource->getVotesRating(),
                    'positive' => $this->resource->getVotesPositive(),
                    'negative' => $this->resource->getVotesNegative()
                ],
                'seo' => is_null($this->resource->getSeo())
                    ? null
                    : json_decode($this->resource->getSeo())
            ];
        }
    }
}