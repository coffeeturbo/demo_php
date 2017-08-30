<?php
namespace TagBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use TagBundle\Form\TagFormType;
use TagBundle\Response\SuccessTagResponse;

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

            // todo сделать проверку на уникальность тэга
            $tag = $this->get('tag.service.tag_service')->create($data['name']);
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessTagResponse($tag);
    }
}