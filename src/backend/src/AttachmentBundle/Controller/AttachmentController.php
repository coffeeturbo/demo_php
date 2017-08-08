<?php
namespace AttachmentBundle\Controller;


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
        $data = $this->get('app.validate_request')->getData($request, AttachmentLinkType::class);

        dump($data);



        return new JsonResponse(['success' => true ]);
    }
}