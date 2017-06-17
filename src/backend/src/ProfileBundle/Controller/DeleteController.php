<?php

namespace ProfileBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получаем профиль по id",
     *  authentication=true,
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     * )
     *
     * @param $id
     * @return JsonResponse
     */
    public function deleteAction($id)
    {
        try {
            $profileService = $this->get('profile.service');

            $profile = $profileService->getById($id);

            $profileService->delete($profile);

        } catch (NotFoundHttpException $e) {
            return new ErrorJsonResponse($e->getMessage() [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }
}