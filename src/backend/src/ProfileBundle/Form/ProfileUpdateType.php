<?php

namespace ProfileBundle\Form;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class ProfileUpdateType extends AbsctractProfileType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder
            ->add("name", TextType::class, [
                "required" => false
            ])
        ;
    }
}