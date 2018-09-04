<?php
namespace VoteBundle\Handler;

use AppBundle\Handler\RequestHandler;
use Symfony\Component\HttpFoundation\Request;
use VoteBundle\Criteria\VoteContentCriteria;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteType\VoteType;

class VotedContentHandler implements RequestHandler
{

    public function __construct(Request $request)
    {
        $this->handleRequest($request);
    }

    private $criteria;
    public function handleRequest(Request $request)
    {
        $limit = $request->get('limit') ?? 10 ;
        $cursor = $request->get('cursor') ?? 0 ;
        $order = $request->get('sort') ?? 'id';
        $profile = $request->get('profile') ?? null;
        $direction = $request->get('direction') ?? 'DESC';

        $voteType = VoteType::createFromStringCode($request->get('vote_type'));
        $contentType = VoteContentType::createFromStringCode($request->get('content_type'));

        $this->criteria = new VoteContentCriteria($limit, $cursor, $contentType, $voteType, $profile);

        $this->criteria->setDirection($direction);
        $this->criteria->setOrder($order);

    }

    public function getCriteria(): VoteContentCriteria
    {
        return $this->criteria;
    }

}