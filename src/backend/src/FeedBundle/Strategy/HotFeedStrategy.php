<?php
namespace FeedBundle\Strategy;

use Doctrine\ORM\NoResultException;
use PostBundle\Entity\Post;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class HotFeedStrategy extends FeedStrategy
{

    public function getPosts()
    {
        $this->getHotPosts();

        return $this->posts;
    }

    private function getHotPosts()
    {
        try {

            $startDate = new \DateTime();
            $startDate->sub(new \DateInterval('P900D'));
            $this->feedCriteria->setStartDate($startDate);


            $where ='WHERE p.isDeleted = 0';

            if($cursor = $this->feedCriteria->getCursor()){
                $where .= sprintf("AND p.id < %s", $cursor);
            }

            $q = sprintf("SELECT
                            p,
                        (
                              (p.votesPositive + p.votesNegative) 
                              / (CURRENT_TIMESTAMP() - (p.created))*3600
                        ) AS rating_speed
                        
                        FROM %s p
                        %s
                        ORDER BY rating_speed DESC
                        "
                , Post::class, $where);

            $q = $this->getPostRepository()->getEntityManager()->createQuery($q);
            $q->setMaxResults($this->feedCriteria->getLimit());


        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("no posts founded"));
        }

        // получаем из смешанного массива не смешанный

        $this->posts = array_map(function(array $post){
            return $post[0];
        }, $q->getResult());
    }


}