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
            'isDeleted'     => $this->resource['isDeleted'],
            'profile'       => isset( $this->resource['profile'])
                ?(new ProfileFormatter( $this->resource['profile']))->format():null,
            'votesRating'   => $this->resource['votesRating'],
            'votesPositive' => $this->resource['votesPositive'],
            'votesNegative' => $this->resource['votesNegative'],
            'created'       => $this->resource['created']->format(\DateTime::W3C),
            'updated'       => $this->resource['updated']->format(\DateTime::W3C),

            'level'         => $this->resource['level'],
            'commentsTotal' => $this->resource['commentsTotal'],

            'parentComment' => isset($this->resource['parentComment']) ? (new ArrayCommentFormatter($this->resource['parentComment']))->format() : null,

            'childrenComments' => isset($this->resource['childrenComments']) ? (new CommentsFormatter($this->resource['childrenComments']))->format() : null,

            'attachments' => isset($this->resource['attachments']) ? (new AttachmentsFormatter($this->resource['attachments']))->format() : null,
        ];
    }

}