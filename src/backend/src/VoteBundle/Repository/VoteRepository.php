<?php
namespace VoteBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;
use PostBundle\Entity\Post;
use ProfileBundle\Entity\Profile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use VoteBundle\Criteria\VoteContentCriteria;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteContentType\VoteContentTypeComment;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;

class VoteRepository extends EntityRepository
{
    public function save(Vote $vote)
    {
        $em = $this->getEntityManager();
        $em->persist($vote);
        $em->flush($vote);
    }

    public function remove(Vote $vote)
    {
        $em = $this->getEntityManager();
        $em->remove($vote);
        $em->flush();
    }


    public function getVotesByPostIds(array $postIds, Profile $profile){
        try{
            $votes = $this->findBy([
                'profile' => $profile->getId(),
                'contentType' => VoteContentTypePost::INT_CODE,
                'contentId' => $postIds,
            ]);
        } catch(NoResultException $e){
            return new NotFoundHttpException();
        }

        return $votes;

    }

    public function getVoteByPost(Post $post, Profile $profile): ?Vote
    {
        $vote = $this->findOneBy([
            'profile' => $profile->getId(),
            'contentType' => $post->getType()->getIntCode(),
            'contentId' => $post->getId(),
        ]);

        return $vote instanceof Vote ? $vote : null;
    }

    public function getVotesByCommentIds(array $commentIds, Profile $profile)
    {
        try{
            $votes = $this->findBy([
                'profile' => $profile->getId(),
                'contentType' => VoteContentTypeComment::INT_CODE,
                'contentId' => $commentIds,
            ]);
        } catch(NoResultException $e){
            return new NotFoundHttpException();
        }

        return $votes;
    }


    public function getVotedContentByCriteria(VoteContentCriteria $contentCriteria)
    {
        try{

            $criteria = [
                'profile' => $contentCriteria->getProfileId(),
            ];

            if($type=$contentCriteria->getVoteType())
                $criteria = array_merge($criteria, ['type' => $type->getIntCode()]);

            if($contentType = $contentCriteria->getContentType())
                $criteria = array_merge($criteria, ['contentType' => $contentType->getIntCode()]);

            $votes = $this->findBy($criteria);

            $postIds = array_map(function(Vote $vote){
                return $vote->getContentId();
            }, $votes);

            $postRep = $this->getEntityManager()->getRepository(Post::class);

            $posts = $postRep->findBy(['id' => $postIds]);

            array_walk($posts, function(Post $post) use ($votes){
                /** @var Vote $vote */
                foreach($votes as $vote) {
                    if($post->getId() === $vote->getContentId()){
                        $post->setVote($vote);
                        break;
                    }
                }
            });

        } catch(NoResultException $e){
            return new NotFoundHttpException();
        }

        return $posts;
    }


}