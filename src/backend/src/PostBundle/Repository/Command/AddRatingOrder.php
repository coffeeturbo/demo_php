<?php
namespace PostBundle\Repository\Command;

use Doctrine\ORM\QueryBuilder;
use FeedBundle\Criteria\FeedCriteria;

class AddRatingOrder implements AddOrderInterface
{
    static public function addOrder(QueryBuilder $builder, FeedCriteria $criteria)
    {
        $builder->orderBy('p.votesRating', $criteria->getDirection());

        if($postId = $criteria->getCursor()){

            $post = $builder->getEntityManager()->getRepository('PostBundle:Post')->getPostById($postId);

            // desc
            switch(strtolower($criteria->getDirection())){
                case 'desc':
                    $builder->andWhere('p.votesRating < :rating');
                    $builder->andWhere('p.id < :id');

                    break;
                case 'asc':
                    $builder->andWhere('p.votesRating > :rating');
                    $builder->andWhere('p.id > :id');
                    break;

                default: {
                    $builder->andWhere('p.votesRating < :rating');
                    $builder->andWhere('p.id < :id');
                }


            }
            $builder->setParameter('rating', $post->getVotesRating())
                ->setParameter('id', $postId);
        }
    }

}