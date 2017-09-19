<?php
namespace FeedBundle\Controller;

use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class FeedController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Feed",
     *  description="Получаем посты",
     * )
     *
     */
    public function feedAction(int $limit, int $offset)
    {
        // todo добавить максимальный limit для ленты и вынести в файл конфигурации

        $posts = $this->get('post.repository')
            ->getPostsWithTagsAndAttachments($limit, $offset);

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