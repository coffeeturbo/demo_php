<?php
namespace VoteBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Response\SuccessPostResponce;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteType\VoteTypeNegative;
use VoteBundle\Entity\VoteType\VoteTypePositive;

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
        try {

            $postRepository = $this->get('post.service')->getPostRepository();
            $voteService = $this->get('vote.service.vote_service');
            $profile = $this->get('profile.service')->getCurrentProfile();

            $post = $postRepository->getPostById($postId);
            $vote = new Vote($profile, $post, new VoteTypePositive());

            $existsVote = $voteService->findVote($vote);


            if(is_null($existsVote)){
                $voteService->create($vote);

                $voteService->attachVote($post, $vote);
                $postRepository->save($post);
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch (UnauthorizedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessPostResponce($post);
    }


    /**
     * @ApiDoc(
     *     section="Vote",
     *     description= "негативная оценка поста",
     *     authentication=true,
     * )
     */
    public function voteNegativeAction($postId)
    {
        try {
            $postRepository = $this->get('post.service')->getPostRepository();
            $voteService = $this->get('vote.service.vote_service');
            $profile = $this->get('profile.service')->getCurrentProfile();


            $post = $postRepository->getPostById($postId);
            $vote = new Vote($profile, $post, new VoteTypeNegative());

            $existsVote = $voteService->findVote($vote);


            if(is_null($existsVote)){
                $voteService->create($vote);
                $voteService->attachVote($post, $vote);
                $postRepository->save($post);
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch (UnauthorizedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessPostResponce($post);
    }

    /**
     * @ApiDoc(
     *     section="Vote",
     *     description= "удалить оценку поста",
     *     authentication=true,
     * )
     */
    public function voteRemoveAction($postId)
    {
        try {
            $postRepository = $this->get('post.service')->getPostRepository();
            $voteService = $this->get('vote.service.vote_service');

            $profile = $this->get('profile.service')->getCurrentProfile();

            $post = $postRepository->getPostById($postId);

            $vote = new Vote($profile, $post);

            $existsVote = $voteService->findVote($vote);

            if($existsVote){
                $existsVote->setVoteableEntity($post);
                $voteService->detach($post, $existsVote);
                $voteService->delete($existsVote);
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch (UnauthorizedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessPostResponce($post);
    }

}