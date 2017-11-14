<?php
namespace FeedBundle\Handler;

use FeedBundle\Criteria\FeedCriteria;
use Symfony\Component\HttpFoundation\Request;

class FeedHandler
{
    private $criteria;

    public function __construct(Request $request)
    {
        $this->handleRequest($request);
    }

    public function handleRequest( Request $request)
    {

        $limit = $request->get('limit');
        $cursor = $request->get('cursor');
        $order = $request->get('order') ?? 'id';
        $direction = $request->get('direction') ?? 'DESC';

        $this->criteria = new FeedCriteria($limit, $cursor, $order, $direction);
    }



    public function getCriteria(): FeedCriteria
    {
        return $this->criteria;
    }
}