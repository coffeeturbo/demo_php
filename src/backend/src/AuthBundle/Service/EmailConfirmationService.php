<?php
namespace AuthBundle\Service;

use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\EmailConfirmationType;
use AuthBundle\Repository\ConfirmationRepository;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EmailConfirmationService
{
    private $authService;
    private $mailer;
    private $confirmationRepository;
    private $emailCodeLifeTimeMin;
    private $emailNoReply;

    public function __construct(
        AuthService $authService,
        \Swift_Mailer $mailer,
        ConfirmationRepository $confirmationRepository,
        int $emailCodeLifeTimeMin,
        string $emailNoReply
    ){
        $this->authService = $authService;
        $this->mailer = $mailer;
        $this->confirmationRepository = $confirmationRepository;
        $this->emailCodeLifeTimeMin = $emailCodeLifeTimeMin;
        $this->emailNoReply = $emailNoReply;
    }


    public function hasActiveConfirmation(): bool
    {
        /** @var Confirmation $confirmation */
        $confirmation = $this->confirmationRepository->findOneBy([
            'account' => $this->authService->getAccount(),
            'wasted' => false,
            'type' => EmailConfirmationType::INT_CODE
        ]);


        return !is_null($confirmation) && !$confirmation->isExpired();
    }

    public function generateConfirmation(string $confirmUrl)
    {
        $code = rand(1000, 9999);

        if($this->hasActiveConfirmation()) throw new AccessDeniedHttpException('confirmation code already sended');


        $sended = $this->send($code, $confirmUrl);

        if($sended === 0) throw new \Exception("message not sended");

        $this->createConfirmation($code);
    }

    public function send($code, string $confirmUrl)
    {
        $swiftMessage = $this->createEmailConfirmationMessage($code, $confirmUrl);
        // Create the Mailer using your created Transport
        return $this->mailer->send($swiftMessage);
    }

    public function createEmailConfirmationMessage($code, $confirmUrl): \Swift_Message
    {
        $mailTo = $this->authService->getAccount()->getEmail();

        $titleText = "TopicOff.com | Код подтверждания";

        $message = sprintf("Это код подтверждения регистрации: <b>%s</b>", $code);

        $message.= "<br>Также вы можете активировать ваш аккаунт перейдя по ссылке: <br>";
        $message.= $this->generateConfirmLink($code, $confirmUrl);

        $swiftMessage = new \Swift_Message($titleText);

        $swiftMessage->setFrom($this->emailNoReply)
            ->setTo($mailTo)
            ->setBody($message, 'text/html')
        ;

        return $swiftMessage;
    }

    public function generateConfirmLink($code, $confirmUrl):string
    {
        $confirmPath = $confirmUrl.$code;
        return sprintf('<a target="_blank" href="%1$s">%1$s</a>',$confirmPath );
    }

    public function createConfirmation($code)
    {
        $confirmation = new Confirmation($this->authService->getAccount(), $code);

        $emailCodeLifeTime = sprintf('PT%sM', $this->emailCodeLifeTimeMin);
        $expires = (new \DateTime())->add(new \DateInterval($emailCodeLifeTime));
        $confirmation
            ->setType(new EmailConfirmationType())
            ->setExpires($expires)
            ->setNotConfirmed()
            ->setUpdated(new \DateTime())
        ;

        $this->confirmationRepository->save($confirmation);
    }


    public function activateCode($code, $confirmUrl){
        // todo Добавить проверку на количество неправильных попыток

       /** @var Confirmation $confirmation */
       $confirmation = $this->confirmationRepository->findOneBy([
           'account' => $this->authService->getAccount(),
           'isConfirmed' => false,
           'wasted' => false,
           'code' => $code,
           'type' => EmailConfirmationType::INT_CODE
       ]);


        if(!$confirmation) {
            throw new NotFoundHttpException("no code was found");
        }

        if($confirmation->isExpired()) {
            $this->regenerateCode($confirmation, $confirmUrl);
            throw new AccessDeniedHttpException("code has expired");
        }

        if(strcmp($confirmation->getCode(), $code)!==0){
            $this->regenerateCode($confirmation, $confirmUrl);
            throw new AccessDeniedHttpException("bad code - new generated");
        }

        $confirmation->setConfirmed();
        $this->authService->confirmAccountByEmail($this->authService->getAccount());
        $confirmation->setWasted(true);
        $this->confirmationRepository->save($confirmation);

        return true;
    }

    public function regenerateCode(Confirmation $confirmation, $confirmUrl)
    {
        $confirmation->setWasted(true);
        $this->confirmationRepository->save($confirmation);
        $this->generateConfirmation($confirmUrl);
    }
}