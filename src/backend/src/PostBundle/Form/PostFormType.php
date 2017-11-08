<?php
namespace PostBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
use TagBundle\Form\TagFormType;

class PostFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add("title", TextType::class, [
                'required' => true,
                "constraints" => [
                    new NotBlank()
                ]
            ])
            ->add('tags', CollectionType::class, [
                'entry_type' => TagFormType::class,
                'allow_add' => true,
                'allow_extra_fields' => true
            ])
            ->add('attachments', CollectionType::class, [
                'allow_add' => true,
                'allow_extra_fields' => true
            ])
        ;
    }
}