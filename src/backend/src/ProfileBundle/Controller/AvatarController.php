<?php

namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use AvatarBundle\Parameter\UploadedImageParameter;
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
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
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

            $params = new UploadedImageParameter(
                $image,
                $request->get('width'),
                $request->get('height'),
                $request->get('x'),
                $request->get('y')
            );

            $profileService->uploadAvatar($profile, $params);

        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessProfileResponse(
            $profile
        );

    }
}