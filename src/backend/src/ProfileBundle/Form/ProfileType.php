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
            ->add('first_name', TextType::class, [
                'label' => 'Имя профиля'
            ])
            ->add('last_name', TextType::class, [
                'label' => 'Фамилия '
            ])
            ->add('patronymic', TextType::class, [
                'label' => 'Отчество'
            ])
            ->add('alias', TextType::class)
            ->add('nickname', TextType::class, [
                'label' => 'Прозвище'
            ])
            ->add('gender', TextType::class, [
                'label'  => 'выберитье пол none- нет пола male- мужской  female-Женский',
            ])
            ->add('birth_date', DateTimeType::class,[
                'label' => '27-05-2017'
            ])
        ;
    }

}