<?php
namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use AvatarBundle\Parameter\UploadedImageParameter;
use ProfileBundle\Form\BackdropUploadType;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BackdropController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Загрузить аватар к профилю",
     *  authentication=true,
     *  input = {"class" = "ProfileBundle\Form\BackdropUploadType", "name"  = ""},
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     * )
     *
     * @param int $id
     * @param Request $request
     */
    public function uploadAction(int $id, Request $request)
    {
        try{
            $profileService = $this->get('profile.service');

            $profile = $profileService->getById($id);

            $body = $this->get('app.validate_request')->validate($request, BackdropUploadType::class);

            $params = new UploadedImageParameter($body['image']);
            $params->setStartY($body['y']);

            $profileService->uploadBackdrop($profile, $params);
        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage());
        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessProfileResponse($profile);
    }

    /*public function deleteAction(int $id)
    {
        $profileService = $this->get('profile.service');

        $profile = $profileService->getById($id);

        $profileService->deleteBackdrop($profile);

        return new SuccessProfileResponse($profile);
    }*/
}