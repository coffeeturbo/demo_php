<?php

namespace ProfileBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Form\AvatarUploadType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AvatarController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Загрузить аватар к профилю",
     *  authentication=true,
     *  input = {"class" = "ProfileBundle\Form\AvatarUploadType", "name"  = ""},
     * )
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function uploadAction(int $id, Request $request)
    {
        $body = $this->get('app.validate_request')->validate($request, AvatarUploadType::class);
        dump($id);
        dump($body);
        return new JsonResponse(['success' => true]);
    }
}
