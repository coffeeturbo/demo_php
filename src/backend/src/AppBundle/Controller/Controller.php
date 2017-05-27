<?php

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller as SymfonyController;

class Controller extends SymfonyController
{
    protected function getAccount()
    {
        return $this->getUser();
    }
}