<?php
namespace TagBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use TagBundle\Form\TagFormType;
use TagBundle\Response\SuccessTagResponse;
use TagBundle\Response\SuccessTagsResponse;

class TagController extends Controller
{

    /**
     * @ApiDoc(
     *     section="Tag",
     *     description= "Создает тэг",
     *     authentication=true,
     *     input = {"class" = "TagBundle\Form\TagFormType", "name"  = ""},
     *     output = {"class" = "TagBundle\Response\SuccessTagResponse"},
     * )
     */
    public function createAction(Request $request)
    {
        try {
            $data = $this->get('app.validate_request')->getData($request, TagFormType::class);

            $tag = $this->get('tag.service.tag_service')->create($data['name']);
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessTagResponse($tag);
    }


    /**
     * @ApiDoc(
     *     section="Tag",
     *     description= "Находит подходящиие теги",
     *     authentication=true,
     *     output = {"class" = "TagBundle\Response\SuccessTagResponse"},
     * )
     */
    public function searchAction($query)
    {
        try {
            if (mb_strlen($query) < 3) throw new \Exception('requested query is to swall');
            $tags = $this->get('tag.repository.tag_repository')->search($query);

        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessTagsResponse($tags);
    }
}