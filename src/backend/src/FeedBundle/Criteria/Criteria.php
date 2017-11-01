<?php
namespace FeedBundle\Criteria;

abstract class Criteria
{
    private $limit;
    private $cursor;

    public function __construct(int $limit, int $cursor)
    {
        $this->limit = $limit;
        $this->cursor = $cursor;
    }

    public function getLimit()
    {
        return $this->limit;
    }

    public function setLimit($limit)
    {
        $this->limit = $limit;
    }


    public function getCursor()
    {
        return $this->cursor;
    }

    public function setCursor($cursor)
    {
        $this->cursor = $cursor;
    }

}