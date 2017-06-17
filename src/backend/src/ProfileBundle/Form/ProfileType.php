<?php

namespace ProfileBundle\Form;

use ProfileBundle\Entity\Profile\Gender\FemaleGender;
use ProfileBundle\Entity\Profile\Gender\MaleGender;
use ProfileBundle\Entity\Profile\Gender\NoneGender;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class ProfileType extends AbstractType
{
    private $minAge;
    private $maxAge;
    
    function __construct(int $minAge, int $maxAge)
    {
        $this->minAge = $minAge;
        $this->maxAge = $maxAge;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add("name", TextType::class, [
                "constraints" => [
                    new NotBlank()
                ]
            ])
            ->add("alias", TextType::class, [
                "required" => false
            ])
            ->add("gender", ChoiceType::class, [
                "choices" => [
                    new FemaleGender(),
                    new MaleGender(),
                    new NoneGender(),
                ],
                "empty_data" => NoneGender::STRING_CODE,
                "choice_value" => "stringCode", // будет использоваться метод getStringCode (см. http://symfony.com/doc/current/reference/forms/types/choice.html#choice-label) 
                "required" => false,
            ])
            ->add("birth_date", BirthdayType::class, [
                "widget" => "single_text",
                "format" => "dd-MM-yyyy", // DOTO: MAKE AS CONST!
                "required" => false,
                "constraints" => [
                    new Callback(function (?\DateTime $birthDate, ExecutionContextInterface $context)
                    {
                        if ($birthDate instanceof \DateTime) {
                            $age = $birthDate->diff(new \DateTime())->y;

                            if ($age < $this->minAge) {
                                $context->addViolation(sprintf("Unacceptable age `%s`. Yonger then ", $age, $this->minAge));
                            }

                            if ($age > $this->maxAge) {
                                $context->addViolation(sprintf("Unacceptable age `%s`. Older then %s", $age, $this->maxAge));
                            }
                        }
                    })
                ]
            ])
        ;
    }
}