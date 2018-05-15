<?php
namespace AuthBundle\Service;

class EmailConfirmationService
{
    private $authService;
    private $mailer;

    public function __construct(AuthService $authService, \Swift_Mailer $mailer)
    {
        $this->authService = $authService;
        $this->mailer = $mailer;
    }

    public function send($code)
    {

        $mailTo = $this->authService->getAccount()->getEmail();

        $titleText = "TopicOff.com | Код подтверждания";

        $message = sprintf("это код подтверждения регистрации %s", $code);

        $swiftMessage = new \Swift_Message($titleText);

        $swiftMessage->setFrom('send@example.com')
            ->setTo($mailTo)
            ->setBody($message);

        // Create the Mailer using your created Transport
        return $this->mailer->send($swiftMessage);
    }
}