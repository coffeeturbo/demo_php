<?php
namespace AuthBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use AuthBundle\Form\ChangePasswordType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ChangePasswordController extends Controller
{

    /**
     * Меняет пароль аккаунта
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "Сменить пароль",
     *  authentication=true,
     *  input= { "class"="AuthBundle\Form\ChangePasswordType", "name"=""},
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная смена пароля",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function changePasswordAction(Request $request)
    {
        try {
            $body = $this->get('app.validate_request')->getData($request, ChangePasswordType::class);

            // если тут нету выкидываем ошибку
            $account = $this->get('auth.service')->getAccount();

            $oldPassword = $body['old_password'];

            $newPassword = ($body['password_confirm'] === $body['password']) ? $body['password'] : false;

            if(!$newPassword){
                throw new AccessDeniedHttpException('Пароли не совпадают');
            }

            // пароли не совпадают
            $encoder = $this->get('security.encoder_factory')->getEncoder($account);

            $valid = $encoder->isPasswordValid($account->getPassword(), $oldPassword, $account->getSalt());

            if(!$valid){
                throw new AccessDeniedHttpException('Ваш текущий пароль не верен');
            }

            $this->get('fos_user.util.user_manipulator')->changePassword($account->getUsername(), $body['password']);


        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new JsonResponse([
            'password_changed' => true
        ]);

    }
}