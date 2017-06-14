<?php
namespace ProfileBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class ProfileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', TextType::class, [
                'label' => 'Имя профиля'
            ])
            ->add('name', TextType::class, [
                'label' => 'Имя профиля'
            ])
            ->add('alias', TextType::class)
            ->add('gender', TextType::class, [
                'label'  => 'выберитье пол none- нет пола male- мужской  female-Женский',
            ])
            ->add('birth_date', DateTimeType::class,[
                'label' => '27-05-2017'
            ])
        ;
    }

}