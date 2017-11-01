<?php
namespace FeedBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class FeedFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add("limit", NumberType::class, [
//                'required' => true,
                "constraints" => [
//                    new NotBlank()
                ]
            ])
//            ->add("cursor", NumberType::class, [
//                'required' => true,
//                "constraints" => [
//                    new NotBlank()
//                ]
//            ])
            ->add("order", TextType::class, [
                'required' => true,
                "constraints" => [
                    new NotBlank()
                ]
            ])
//            ->add("direction", TextType::class, [
//                'required' => true,
//                "constraints" => [
//                    new NotBlank()
//                ]
//            ])
        ;
    }
}