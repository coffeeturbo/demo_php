<?php
namespace PostBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class InfoPostsController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Получаем информац онные посты"
     * )
     *
     * @param Request $request
     */
    public function getAction()
    {
        try {

            // проеряем есть ли в контейнере данный аргумент
            $postsIds = $this->container->hasParameter('post_info_posts')
                ? $postsIds = $this->container->getParameter('post_info_posts')
                : $this->getParameter('post.info.posts') ;

            $posts = [];
            $ids = array_map(function(array $infoPost){
                return $infoPost['id'];
            }, $postsIds);

            if(count($ids)>1) {
                $posts = $this->get('post.service')->getPostRepository()->getPostsByIds($ids);
            }

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessPostsResponse($posts);
    }


}