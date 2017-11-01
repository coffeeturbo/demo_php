<?php
namespace FeedBundle\Criteria;

class FeedCriteria extends Criteria
{

    private $validOrders = [
        'id',

    ];

    private $order = 'id';
    private $direction = "DESC";

    public function __construct(int $limit, int $cursor, string $order, string $direction)
    {
        parent::__construct($limit, $cursor);

        $this->order = $order;
        $this->direction = $direction;
    }

    public function getOrder(): string
    {
        return $this->order;
    }

    public function setOrder(string $order)
    {
        $this->order = $order;
    }

    public function getDirection(): string
    {
        return $this->direction;
    }

    public function setDirection(string $direction)
    {
        $this->direction = $direction;
    }

}