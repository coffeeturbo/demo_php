<?php
namespace FeedBundle\Criteria;

class FeedCriteria extends Criteria
{

    private $validOrders = [
        'id',
        'votesRating',
        'votes_rating',
        'rating',
    ];


    public function __construct(int $limit, int $cursor, string $order, string $direction)
    {
        parent::__construct($limit, $cursor);

        $this->setOrder($order);
        $this->direction = $direction;
    }


    public function setOrder(string $order)
    {

        if(strcmp($order, 'votes_rating') == 0
            | strcmp($order, 'rating') == 0
        ){
            $order = 'votesRating';
        }

        $this->order = $order;
        return $this;
    }

    public function setDirection(string $direction)
    {
        $this->direction = $direction;
    }

}