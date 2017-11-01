<?php
namespace FeedBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use FeedBundle\Criteria\FeedCriteria;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    public function feedAction(int $limit, int $cursor, Request $request)
    {
        // todo добавить максимальный limit для ленты и вынести в файл конфигурации

//        dump($request);
        try {
            $request->get('order');
//            $data = $this->get('app.validate_request')->getData($request, FeedFormType::class);
            $data = json_decode($request->getContent(), true);

            $criteria = new FeedCriteria($limit, $cursor, $order= 'id', $direction = 'ASC');

            $posts = $this->get('post.repository')
                ->getPostsWithTagsAndAttachments($criteria);


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