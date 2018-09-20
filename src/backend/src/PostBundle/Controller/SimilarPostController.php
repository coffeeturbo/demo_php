<?php
namespace PostBundle\Controller;

use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class SimilarPostController extends Controller
{


    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Создаём пост",
     * )
     *
     * @param Request $request
     */
    public function getSimilarPostsAction(int $post_id){
        $posts = $this->get('post.service')->getSimilarPosts($post_id);

        return new SuccessPostsResponse($posts);
    }
}