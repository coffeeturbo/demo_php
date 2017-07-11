<?php

namespace AppBundle\Service;

use AppBundle\Exception\BadRestRequestHttpException;
use Symfony\Component\Form\FormFactory;
use Symfony\Component\HttpFoundation\Request;

class ValidateRequestService
{
    private $formFactory;

    function __construct(FormFactory $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    public function validate(Request $request, string $type, $data = null)
    {
        $form = $this->formFactory->createNamed(null, $type, $data);
        $form->handleRequest($request);

        if(!$form->isSubmitted()) {
            $body = json_decode($request->getContent(), true);
            $clearMissing = $request->getMethod() != 'PATCH';
            $form->submit($body, $clearMissing);
        }

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->all() as $input) {
                foreach ($input->getErrors() as $error) {
                    $errors[$input->getName()] = $error->getMessage();
                }
            }
            
            throw new BadRestRequestHttpException($errors);
        }

        return $form->getData();
    }
}