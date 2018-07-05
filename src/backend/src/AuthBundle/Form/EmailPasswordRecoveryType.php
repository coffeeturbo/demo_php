<?php
namespace AuthBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class EmailPasswordRecoveryType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                "constraints" => [new NotBlank()],
                'required' => true , 'label' => 'url'])
            ->add('url', UrlType::class, [
                "constraints" => [new NotBlank()],
                'required' => true , 'label' => 'url'])
        ;
    }
}