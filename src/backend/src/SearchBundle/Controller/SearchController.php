<?php
namespace SearchBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SearchController extends Controller
{

    /**
     * @ApiDoc(
     *     section="Search",
     *     description= "Находит подходящие фразы для автодополнения",
     * )
     */
    public function searchAdditionAction($query)
    {
        $posts = [];
        try {
            $posts = $this->get('post.service')->getPostRepository()->searchAdditions($query);

        } catch(\Exception $e){

        }

        return new JsonResponse($posts);
    }

    /**
     * @ApiDoc(
     *     section="Search",
     *     description= "Ищим по сообщениям совпадения",
     *     output = {"class" = "TagBundle\Response\SuccessTagResponse"},
     * )
     */
    public function searchFullAction($query, Request $request)
    {
        $cursor = $request->get('cursor');
        $posts = [];
        try{
            $posts = $this->get('post.service')->getPostRepository()->searchFull($query, $cursor);
        } catch(\Exception $e){

        }

        return new SuccessPostsResponse($posts);
    }
}