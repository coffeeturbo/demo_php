<?php
namespace FeedBundle\Handler;

use AppBundle\Handler\RequestHandler;
use FeedBundle\Criteria\FeedCriteria;
use Symfony\Component\HttpFoundation\Request;
use VoteBundle\Entity\VoteType\VoteType;

class FeedHandler implements RequestHandler
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
        $order = $request->get('sort') ?? 'id';
        $profile = $request->get('profile') ?? null;
        $direction = $request->get('direction') ?? 'DESC';

        $tags = $this->getTags($request) !== null ? $this->getTags($request) : null ;

        $dateFrom = $request->get('dateFrom') ? new \DateTime($request->get('dateFrom')) : null;
        $dateTo = $request->get('dateTo')? new \DateTime($request->get('dateTo')) : null;

        $voteType = !is_null( $request->get('vote_type') )
            ? VoteType::createFromStringCode($request->get('vote_type'))
            : null;

        $this->criteria = new FeedCriteria($limit, $cursor, $order, $direction, $dateFrom, $dateTo, $profile, $tags,$voteType);
    }

    public function getCriteria(): FeedCriteria
    {
        return $this->criteria;
    }

    public function getTags(Request $request) {
        $tags = null;

        if($request->get('tags') !== null)
        {
            $tags = json_decode($request->get('tags'));
        }

        return $tags;
    }
}