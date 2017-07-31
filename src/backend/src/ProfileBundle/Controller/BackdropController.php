<?php
namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use ImageBundle\Image\Image;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use AvatarBundle\Parameter\UploadedImageParameter;
use ProfileBundle\Form\BackdropUploadType;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
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
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Загрузить Бэкдроп к профилю",
     *  authentication=true,
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     * )
     *
     * @param int $id
     * @param Request $request
     */
    public function deleteAction(int $id)
    {
        try{
            $profileService = $this->get('profile.service');

            $profile = $profileService->getById($id);

            $profileService->deleteBackdrop($profile);

        }catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получить профиль по id",
     *  statusCodes = {
     *      200 = "Успешное получение профиля",
     *      404 = "Профиль не найден"
     *  }
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getBackdropPresetsAction()
    {

        $presets = $this->getParameter('profile.backdrop.presets');

        array_walk($presets, function(&$preset, $id){
            $preset = (new Image($preset['absolute_path'], $preset['web_path'], $id))->jsonSerialize();
        });

        return new JsonResponse($presets);
    }


    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Загрузить Бэкдроп к профилю",
     *  authentication=true,
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     * )
     *
     * @param int $id
     * @param Request $request
     */
    public function setBackdropAction(int $id, int $presetId)
    {
        try{
            $profileService = $this->get('profile.service');

            $profile = $profileService->getById($id);
            $presets = $this->getParameter('profile.backdrop.presets');

            $preset =  new Image($presets[$presetId]['absolute_path'], $presets[$presetId]['web_path'], $presetId);

            $profile->setBackdrop($preset);
            $profileService->save($profile);

        }catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessProfileResponse($profile);
    }
}