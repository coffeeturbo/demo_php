<?php
namespace FeedBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use FeedBundle\Handler\FeedHandler;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FeedController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Feed",
     *  description="Получаем посты",
     *  authentication=true,
     * )
     *
     */
    public function feedAction(Request $request)
    {
        // todo добавить максимальный limit для ленты и вынести в файл конфигурации

        try {
            $handler = new FeedHandler($request);

            $posts = $this->get('post.repository')
                ->getPostsWithTagsAndAttachments($handler->getCriteria());

            if($account = $this->get('auth.service')->getAccount()){

                $profile = $this->get('profile.service')->getCurrentProfile();
                $this->get('vote.service.vote_service')->getVotesToPosts($posts, $profile);
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage(), []);
        }

        return new SuccessPostsResponse($posts);
    }

    /**
     * @ApiDoc(
     *  section="Feed",
     *  description="Получаем посты",
     *  authentication=true,
     * )
     *
     */
    public function hotFeedAction(Request $request)
    {
        try {
//            $handler = new FeedHandler($request);

            $posts = $this->get('post.repository')
                ->getHotPostsWithTagsAndAttachments();

            if($account = $this->get('auth.service')->getAccount()){

                $profile = $this->get('profile.service')->getCurrentProfile();
                $this->get('vote.service.vote_service')->getVotesToPosts($posts, $profile);
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage(), []);
        }

        return new SuccessPostsResponse($posts);
    }

}