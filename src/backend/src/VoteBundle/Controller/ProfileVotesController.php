<?php
namespace VoteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProfileVotesController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Vote",
     *  description="Получаем лайки дизлайки профиля",
     *  authentication=true,
     *     statusCodes = {
     *      200 = "Успешно",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
     *      404 = "не найдено",
     *  }
     * )
     *
     */
    public function getVotesAction($profile_id, $type)
    {
        try {
            
        } catch(\Exception $e){

        }

        return new JsonResponse([
            'profile_id' => $profile_id,
            'type' => $type
        ]);

    }
}