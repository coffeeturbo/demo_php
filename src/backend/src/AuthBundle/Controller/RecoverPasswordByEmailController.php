<?php
namespace AuthBundle\Controller;

use AccountBundle\Entity\Account;
use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\PasswordRecoverConfirmationType;
use AuthBundle\Form\ConfirmPasswordRecoveryType;
use AuthBundle\Form\EmailPasswordRecoveryType;
use Http\Client\Exception\HttpException;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RecoverPasswordByEmailController extends Controller
{

    /**
     * Запросить письмо восстанволения пароля
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "Запросить письмо восстанволения пароля",
     *  authentication=true,
     *  input = {"class" = "AuthBundle\Form\EmailPasswordRecoveryType", "name"  = ""},
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная смена пароля",
     *      400 = "url cannot be null",
     *      403 = "превышено количество запросов",
     *      404 = "email not found",
     *      409 = "token already exists",
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function requestRestorationEmailAction(Request $request){
        try{

            $data = $this->get('app.validate_request')->getData($request, EmailPasswordRecoveryType::class);
            $service = $this->get('auth.service.passord_recovery_service');

            /** @var Account $account */
            $account = $this->get('account.repository')->findOneByEmail($data['email']);

            $service->generateEmailMessage($data['url'], $account);

        } catch(BadRequestHttpException
        | ConflictHttpException
        | AccessDeniedHttpException
        | NotFoundHttpException
        | HttpException
        | BadRestRequestHttpException
        $exception) {
            return new ErrorJsonResponse($exception->getMessage(), [], $exception->getStatusCode());
        } catch(\Exception $exception){
            return new ErrorJsonResponse($exception->getMessage(),$exception->getTrace());
        }

        return new JsonResponse([
           'success' => true
        ]);
    }



    /**
     * Подтвердить восстановление пароля
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "Подтвердить восстановление пароля",
     *  authentication=true,
     *  input = {"class" = "AuthBundle\Form\ConfirmPasswordRecoveryType", "name"  = ""},
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешно подтвержден",
     *      403 = "неправильный пароль",
     *      404 = "неправильный пароль",
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function confirmRestorationEmailAction(Request $request)
    {
        try{
            $body = $this->get('app.validate_request')->getData($request, ConfirmPasswordRecoveryType::class);

            $newPassword = ($body['password_confirm'] === $body['password']) ? $body['password'] : false;

            if(!$newPassword) throw new AccessDeniedHttpException('Пароли не совпадают');

            $confirmationRepository = $this->get('auth.repository.confirmation_repository');
            /** @var $confirmation Confirmation */
            $confirmation = $confirmationRepository->findOneBy([
                'code' => $body['code'],
                'wasted' => false,
                'type' => PasswordRecoverConfirmationType::INT_CODE
            ]);


            if(is_null($confirmation)) throw  new AccessDeniedHttpException("code not valid");


            if($confirmation->isExpired()){
                // перегенирировать
                // $confirmationRepository->wasteConfirmation($confirmation);
            }

            $confirmation->setConfirmed();

            $confirmation->setWasted(true);

            $confirmationRepository->save($confirmation);

            $account = $confirmation->getAccount();

            $this->get('fos_user.util.user_manipulator')->changePassword($account->getUsername(), $newPassword);

            $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($account);
            $event = new AuthenticationSuccessEvent(['token' => $token], $account, new Response());

            $this->get('gesdinet.jwtrefreshtoken.send_token')->attachRefreshToken($event);
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }



        return $this->forward('AuthBundle:RenderToken:render', $event->getData());
    }
}