<?php
namespace CommentBundle\Formatter;

use AppBundle\Formatter\Formatter;
use AttachmentBundle\Formatter\AttachmentsFormatter;
use ProfileBundle\Formatter\ProfileFormatter;

class ArrayCommentFormatter extends Formatter
{
    function format(): ?array
    {

        return is_null($this->resource) ? null : [
            'id'            => $this->resource['id'],
            'is_deleted'     => $this->resource['isDeleted'],
            'profile'       => isset( $this->resource['profile'])
                ?(new ProfileFormatter( $this->resource['profile']))->format() : null,

            'votes' => [
                'state' =>  isset($this->resource['vote'])? $this->resource['vote']['state'] : 'none',
                'rating' => $this->resource['votesRating'],
                'positive' => $this->resource['votesPositive'],
                'negative' => $this->resource['votesNegative']
            ],
            'created'       => $this->resource['created']->format(\DateTime::W3C),
            'updated'       => $this->resource['updated']->format(\DateTime::W3C),

            'level'         => $this->resource['level'],
            'comments_total' => $this->resource['commentsTotal'],

            'parent_comment_id' => isset($this->resource['parentComment']) ? (new ArrayCommentFormatter($this->resource['parentComment']))->format()['id'] : [],

            'comments' => isset($this->resource['childrenComments']) ? (new CommentsFormatter($this->resource['childrenComments']))->format() : [],

            'attachments' => isset($this->resource['attachments']) ? (new AttachmentsFormatter($this->resource['attachments']))->format() : [],
        ];
    }

}