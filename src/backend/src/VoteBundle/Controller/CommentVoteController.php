<?php
namespace VoteBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use AppBundle\Http\ErrorJsonResponse;
use CommentBundle\Response\SuccessCommentResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteType\VoteTypeNegative;
use VoteBundle\Entity\VoteType\VoteTypePositive;

class CommentVoteController extends Controller
{
    /**
     * @ApiDoc(
     *     section="Vote",
     *     description= "позитивная оценка Комментария",
     *     authentication=true,
     * )
     */
    public function votePositiveAction($commentId)
    {
        try {

            $commentRepository = $this->get('comment.repository');
            $voteService = $this->get('vote.service.vote_service');
            $profile = $this->get('profile.service')->getCurrentProfile();

            $comment = $commentRepository->find($commentId);

            $vote = new Vote($profile, $comment, new VoteTypePositive());

            $existsVote = $voteService->findVote($vote);

            if(is_null($existsVote)){
                $voteService->create($vote);

                $voteService->attachVote($comment, $vote);
                $comment->setVote($vote);
                $commentRepository->save($comment);
            } else {
                throw new ConflictHttpException("already voted");
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch (UnauthorizedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(ConflictHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessCommentResponse($comment);
    }

    /**
     * @ApiDoc(
     *     section="Vote",
     *     description= "Негативная оценка Комментария",
     *     authentication=true,
     * )
     */
    public function voteNegativeAction($commentId)
    {
        try {

            $commentRepository = $this->get('comment.repository');
            $voteService = $this->get('vote.service.vote_service');
            $profile = $this->get('profile.service')->getCurrentProfile();

            $comment = $commentRepository->find($commentId);

            $vote = new Vote($profile, $comment, new VoteTypeNegative());

            $existsVote = $voteService->findVote($vote);

            if(is_null($existsVote)){
                $voteService->create($vote);

                $voteService->attachVote($comment, $vote);
                $comment->setVote($vote);
                $commentRepository->save($comment);
            } else {
                throw new ConflictHttpException("already voted");
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch (UnauthorizedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(ConflictHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessCommentResponse($comment);
    }

    /**
     * @ApiDoc(
     *     section="Vote",
     *     description= "Удаление оценки комментария",
     *     authentication=true,
     * )
     */
    public function voteRemoveAction($commentId)
    {
        try {
            $commentRepository = $this->get('comment.repository');
            $voteService = $this->get('vote.service.vote_service');
            $profile = $this->get('profile.service')->getCurrentProfile();

            $comment = $commentRepository->find($commentId);

            $vote = new Vote($profile, $comment, new VoteTypeNegative());

            $existsVote = $voteService->findVote($vote);

            if($existsVote){
                $existsVote->setVoteableEntity($comment);
                $voteService->detach($comment, $existsVote);
                $voteService->delete($existsVote);
                $commentRepository->save($comment);
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch (UnauthorizedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessCommentResponse($comment);
    }
}