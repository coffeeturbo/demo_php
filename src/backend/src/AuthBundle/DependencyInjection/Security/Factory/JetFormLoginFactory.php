<?php

namespace AuthBundle\DependencyInjection\Security\Factory;

use Symfony\Bundle\SecurityBundle\DependencyInjection\Security\Factory\FormLoginFactory;

class JetFormLoginFactory extends FormLoginFactory
{
    public function getKey()
    {
        return 'jet-form-login';
    }

    protected function getListenerId()
    {
        return 'jet.security.authentication.listener.form';
    }
}