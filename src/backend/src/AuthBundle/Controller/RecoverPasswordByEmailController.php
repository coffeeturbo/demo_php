<?php
namespace AuthBundle\Controller;

use AccountBundle\Entity\Account;
use AppBundle\Http\ErrorJsonResponse;
use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\PasswordRecoverConfirmationType;
use AuthBundle\Form\ConfirmPasswordRecoveryType;
use AuthBundle\Form\EmailPasswordRecoveryType;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

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
     *      401 = "неавторизован",
     *      403 = "token already exists",
     *      409 = "email not found",
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
            $account = $this->get('account.repository')->findOneBy(['email'=> $data['email']]);

            if(is_null($account)) throw new AccessDeniedHttpException('this email is not found');

            if(strlen($data['url'])<1) throw new BadRequestHttpException("url cannot be null");

            $service->generateEmailMessage($data['url'], $account);

        } catch(BadRequestHttpException | ConflictHttpException $exception){
            return new ErrorJsonResponse($exception->getMessage(), [], $exception->getStatusCode());
        } catch(AccessDeniedHttpException $exception){
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
     *      200 = "Успешная смена пароля",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
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


            if(!is_null($confirmation)) {
                $confirmation->setConfirmed();
            } else {
                $confirmation->setWasted(true);

                $confirmationRepository->save($confirmation);
                throw  new AccessDeniedHttpException("code not valid");
            }

            $confirmation->setWasted(true);

            $confirmationRepository->save($confirmation);

            $account = $confirmation->getAccount();

            $this->get('fos_user.util.user_manipulator')->changePassword($account->getUsername(), $newPassword);

        }catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }


        $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($account);
        $event = new AuthenticationSuccessEvent(['token' => $token], $account, new Response());

        return $this->forward('AuthBundle:RenderToken:render', $event->getData());
    }
}