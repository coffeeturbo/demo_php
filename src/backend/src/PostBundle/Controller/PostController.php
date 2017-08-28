<?php
namespace PostBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Entity\Post;
use PostBundle\Form\PostFormType;
use PostBundle\Response\SuccessPostResponce;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class PostController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Создаём пост",
     *  authentification="true",
     *  input= { "class"="PostBundle\Form\PostFormType", "name"=""}
     * )
     *
     * @param Request $request
     */
    public function createAction(Request $request)
    {
        $data = $this->get('app.validate_request')->getData($request, PostFormType::class);

        $post = $this->get('post.service')->createFromData($data);


        return new SuccessPostResponce($post);

    }

    public function updateAction()
    {

    }

    public function getAction()
    {

    }

    public function deleteAction()
    {

    }
}