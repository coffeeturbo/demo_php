<?php
namespace PostBundle\Repository\Command;

use Doctrine\ORM\QueryBuilder;
use FeedBundle\Criteria\FeedCriteria;

class AddRatingOrder implements AddOrderInterface
{
    static public function addOrder(QueryBuilder $builder, FeedCriteria $criteria)
    {

        $builder->orderBy('p.votesRating', $criteria->getDirection());
        $builder->addOrderBy('p.created', $criteria->getDirection());
        if($postId = $criteria->getCursor()){

            $post = $builder->getEntityManager()->getRepository('PostBundle:Post')->getPostById($postId);

            // desc
            switch(strtolower($criteria->getDirection())){
                case 'desc':
                    $builder->andWhere('p.created < :created');
                    $builder->andWhere('p.votesRating <= :rating');
                    break;
                case 'asc':
                    $builder->andWhere('p.created > :created');
                    $builder->andWhere('p.votesRating => :rating');
                    break;

                default: {
                    $builder->andWhere('p.created < :created');
                    $builder->andWhere('p.votesRating <= :rating');
                }
            }
            $builder
                ->setParameters([
                    'created' => $post->getCreated(),
                    'rating' => $post->getVotesRating()
                ]);
        }
    }

}