<?php
namespace ProfileBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AvatarDeleteController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Удалить аватар к профилю",
     *  authentication=true,
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     * )
     *
     * @param int $id
     */
    public function avatarDeleteAction(int $id)
    {
        try {

            $profileService = $this->get('profile.service');
            $profile = $profileService->getById($id);

            $profileService->deleteAvatar($profile);

        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessProfileResponse($profile);
    }
}