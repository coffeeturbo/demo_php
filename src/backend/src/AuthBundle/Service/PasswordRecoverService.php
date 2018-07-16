<?php
namespace AuthBundle\Service;

use AccountBundle\Entity\Account;
use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\PasswordRecoverConfirmationType;
use AuthBundle\Repository\ConfirmationRepository;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class PasswordRecoverService
{
    private $mailer;
    private $confirmationRepository;
    private $emailCodeLifeTimeMin;
    private $emailNoReply;

    public function __construct(
        \Swift_Mailer $mailer,
        ConfirmationRepository $confirmationRepository,
        int $emailCodeLifeTimeMin,
        string $emailNoReply
    ){
        $this->mailer = $mailer;
        $this->confirmationRepository = $confirmationRepository;
        $this->emailCodeLifeTimeMin = $emailCodeLifeTimeMin;
        $this->emailNoReply = $emailNoReply;
    }


    public function generateEmailMessage(string $backUrl, Account $account)
    {

        if($confirmation = $this->getActiveConfirmation($account)){
            $this->confirmationRepository->wasteConfirmation($confirmation);
        }

        $code = md5(uniqid((string)rand(0,999999)));

        $this->sendMessage($code, $backUrl, $account->getEmail());
        $this->createConfirmation($code, $account);
    }


    private function sendMessage($code, $backUrl, string $email)
    {

        $titleText = "TopicOff.com | Код подтверждания";

        $message = "Это ссылка восстановления пароля ";
        $message .= $this->generateRecoverLink($backUrl, $code);

        $message .= sprintf("<br>или скопируйте этот код: <b>%s</b><br>", $code);

        $swiftMessage = new \Swift_Message($titleText);

        $swiftMessage->setFrom($this->emailNoReply)
            ->setTo($email)
            ->setBody($message, 'text/html');

        return $this->mailer->send($swiftMessage);
    }


    private function createConfirmation(string $code,Account $account): Confirmation
    {
        $confirmation = new Confirmation($account, $code);

        $emailCodeLifeTime = sprintf('PT%sM', $this->emailCodeLifeTimeMin);
        $expires = (new \DateTime())->add(new \DateInterval($emailCodeLifeTime));
        $confirmation
            ->setType(new PasswordRecoverConfirmationType())
            ->setExpires($expires)
            ->setNotConfirmed()
            ->setUpdated(new \DateTime())
        ;

        $this->confirmationRepository->save($confirmation);


        return $confirmation;
    }


    private function generateRecoverLink(string $backUrl, $code): string
    {
        $url = ($backUrl . $code);

        $path = "<a target='_blank' href='" . $url . "'>ПОДТВЕРДИТЬ</a>";

        return $path;
    }

    private function getActiveConfirmation(Account $account): ?Confirmation
    {
        // TODO добпвить проверку на злоупотребление 10 токенов на день
        $wastedConfirmations = $this->confirmationRepository->countWastedConfirmation($account);

        if($wastedConfirmations > 5)
            throw new AccessDeniedHttpException("количество запросов восстановления пароля превышено");

        /** @var Confirmation $confirmation */
        $confirmation = $this->confirmationRepository->findOneBy([
            'account' => $account,
            'wasted' => false,
            'type' => PasswordRecoverConfirmationType::INT_CODE
        ]);

        return $confirmation;
    }

    private function hasActiveConfirmation(Account $account): bool
    {
        /** @var Confirmation $confirmation */
        $confirmation = $this->confirmationRepository->findOneBy([
            'account' => $account,
            'wasted' => false,
            'type' => PasswordRecoverConfirmationType::INT_CODE
        ]);


        return !is_null($confirmation) && !$confirmation->isExpired();
    }
}