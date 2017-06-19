<?php

namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Form\AvatarUploadType;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
     */
    public function uploadAction(int $id, Request $request)
    {
        try {
            var_dump($request);

            $body = $this->get('app.validate_request')->validate($request, AvatarUploadType::class);
            /** @var UploadedFile $image */
            $image = $body['image'];
            
            $profileService = $this->get('profile.service');

            $profile = $profileService->getById($id);



//            $profileService->uploadAvatar($profile, $body['image'], $body);

            
        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        }

        return new SuccessProfileResponse(
            $profile
        );

    }
}