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


            $result = $this->get('attachment.service.fetch_resource_service')->fetchResource($data['url']);

            $attachment = $this->get('attachment.service.attachment_service')->linkAttachment($data['url'], $result);


        }catch(\HttpUrlException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getCode());
        }
        catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        }

        return new JsonResponse([
            'entity' => $attachment->jsonSerialize(),
            'success' => true ]);
    }
}