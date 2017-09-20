<?php
namespace FeedBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileFeedController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Feed",
     *  description="Получаем количество постов профиля",
     * )
     *
     */
    public function feedAction($id, $limit, $offset)
    {
        $profile = $this->get('profile.repository')->getById($id);

        $posts = $this->get('feed.service.feed_service')->getProfileFeed($profile, $limit, $offset);

        return new SuccessPostsResponse($posts);
    }

    /**
     * @ApiDoc(
     *  section="Feed",
     *  description="Получаем количество постов профиля",
     * )
     *
     */
    public function feedTotalAction($id)
    {
        try{
            $profile = $this->get('profile.repository')->getById($id);

            $total = $this->get('feed.service.feed_service')->getProfileFeedTotal($profile);
        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], 404);
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage(),[], 400);
        }

        return new JsonResponse([
            'total' => $total
        ]);
    }
}