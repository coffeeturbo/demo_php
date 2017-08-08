<?php
namespace AttachmentBundle\Controller;


use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use AttachmentBundle\Form\AttachmentLinkType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class AttachmentController extends Controller
{

    /**
     * @ApiDoc(
     *      section="Attachment",
     *      description= "Возвращает аттачмент ссылки",
     *      input = {"class" = "AttachmentBundle\Form\AttachmentLinkType", "name"  = ""},
     *
     * )
     *
     * @param Request $request
     */
    public function linkAction(Request $request)
    {
        try{
            $data = $this->get('app.validate_request')->getData($request, AttachmentLinkType::class);

            dump($data);
        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        }

        return new JsonResponse(['success' => true ]);
    }
}