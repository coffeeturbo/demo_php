<?php

namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
//            $body = $this->get('app.validate_request')->validate($request, AvatarUploadType::class);
            /** @var UploadedFile $image */
            $image = $request->files->get('image');

            $profileService = $this->get('profile.service');

            $profile = $profileService->getById($id);

            $sizes  = [
                'x' => $request->get('x'),
                'y' => $request->get('y'),
                'width' => $request->get('width'),
                'height' => $request->get('height'),
            ];

            $profileService->uploadAvatar($profile, $image, $sizes);
            $profileService->update($profile);


        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        }

        return new SuccessProfileResponse(
            $profile
        );

    }
}