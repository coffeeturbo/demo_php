<?php
namespace SearchBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class SearchController extends Controller
{

    /**
     * @ApiDoc(
     *     section="Search",
     *     description= "Находит подходящие фразы для автодополнения",
     *     output = {"class" = "TagBundle\Response\SuccessTagResponse"},
     * )
     */
    public function searchAdditionAction($query)
    {
        try {

            $posts = $this->get('post.service')->getPostRepository()->searchAdditions($query);


        } catch(\Exception $e){

        }

        return new JsonResponse($posts);
    }
}