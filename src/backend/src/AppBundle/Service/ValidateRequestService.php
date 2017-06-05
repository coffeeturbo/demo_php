<?php

namespace AppBundle\Service;

use Symfony\Component\Form\FormFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ValidateRequestService
{
    private $formFactory;

    function __construct(FormFactory $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    public function validate(Request $request, $type)
    {
        $body = json_decode($request->getContent(), true);
        $form = $this->formFactory->create($type);
        $form->submit($body);

        if (!$form->isValid())
            // TODO тут пиздец полный если пароль будет недолстаточно сильный выкинет ошибку не понятно что за ошибка
            throw new BadRequestHttpException("Bad parameters");

        return $form->getData();
    }
}