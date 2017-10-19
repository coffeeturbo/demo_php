<?php
namespace FeedBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
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
    public function feedAction(int $limit, int $offset)
    {
        // todo добавить максимальный limit для ленты и вынести в файл конфигурации

        try {
            $posts = $this->get('post.repository')
                ->getPostsWithTagsAndAttachments($limit, $offset);


            if($account = $this->get('auth.service')->getAccount()){

                $profile = $this->get('profile.service')->getCurrentProfile();
                $this->get('vote.service.vote_service')->getVotesToPosts($posts, $profile);
            }

        }catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        }catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage(), []);
        }


        return new SuccessPostsResponse($posts);
    }

    /**
     * @ApiDoc(
     *  section="Feed",
     *  description="Получаем количество постов",
     * )
     *
     */
    public function feedTotalAction()
    {
        $total = $this->get('post.repository')->getPostsTotal();

        return new JsonResponse([
            'total' => $total
        ]);
    }
}