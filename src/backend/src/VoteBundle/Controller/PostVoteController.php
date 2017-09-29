<?php
namespace VoteBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Response\SuccessPostResponce;
use ProfileBundle\Entity\Profile;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteType\VoteType;
use VoteBundle\Entity\VoteType\VoteTypePositive;
use VoteBundle\Vote\VoteableEntity;

class PostVoteController extends Controller
{

    /**
     * @ApiDoc(
     *     section="Vote",
     *     description= "позитивная оценка поста",
     *     authentication=true,
     * )
     */
    public function votePositiveAction($postId)
    {

        $post = $this->get('post.repository')->getPostById($postId);

        $profile = $this->get('profile.service')->getCurrentProfile();

        $vote = new Vote($profile, $post, new VoteTypePositive());

        $existsVote = $this->get('vote.service.vote_service')->findVote($vote);
        $voteService = $this->get('vote.service.vote_service');

        if(is_null($existsVote)){
            $voteService->create($vote);

            $voteService->attachVote($post, $vote);
        }

        $this->get('post.repository')->save($post);

        return new SuccessPostResponce($post);
    }


    public function voteDislikeAction()
    {

    }

}