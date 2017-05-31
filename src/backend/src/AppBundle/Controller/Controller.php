<?php

namespace AppBundle\Controller;


use AuthBundle\Entity\Account;
use Symfony\Bundle\FrameworkBundle\Controller\Controller as SymfonyController;

class Controller extends SymfonyController
{
    protected function getAccount() : Account
    {
        return $this->getUser();
    }
}