<?php
namespace AttachmentBundle\Controller;


use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use AttachmentBundle\Form\AttachmentImageUploadType;
use AttachmentBundle\Form\AttachmentLinkType;
use AttachmentBundle\Response\SuccessAttachmentResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class AttachmentController extends Controller
{

    /**
     * @ApiDoc(
     *      section="Attachment",
     *      description= "Возвращает аттачмент ссылки",
     *      authentication=true,
     *      input = {"class" = "AttachmentBundle\Form\AttachmentLinkType", "name"  = ""},
     *      output = {"class" = "AttachmentBundle\Response\SuccessAttachmentResponse"},
     * )
     *
     * @param Request $request
     */
    public function linkAction(Request $request)
    {
        try {
            $data = $this->get('app.validate_request')->getData($request, AttachmentLinkType::class);

            $result = $this->get('attachment.service.fetch_resource_service')->fetchResource($data['url']);

            $attachment = $this->get('attachment.service.attachment_service')->linkAttachment($data['url'], $result);


        } catch(\HttpUrlException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getCode());
        } catch(BadRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getCode());
        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        }

        return new SuccessAttachmentResponse($attachment);
    }

    /**
     * @ApiDoc(
     *      section="Attachment",
     *      description= "Загружаем картинку аттачмента",
     *      authentication=true,
     *      input = {"class" = "AttachmentBundle\Form\AttachmentImageUploadType", "name"  = ""},
     *      output = {"class" = "AttachmentBundle\Response\SuccessAttachmentResponse"},
     * )
     *
     * @param Request $request
     */
    public function imageUploadAction(Request $request)
    {
        $data = $this->get('app.validate_request')->getData($request, AttachmentImageUploadType::class);


        $this->get('image.service')->
        dump($data['image']);



        return new SuccessAttachmentResponse();
    }
}