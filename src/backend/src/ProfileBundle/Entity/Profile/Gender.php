<?php

namespace ProfileBundle\Entity\Profile;

use ProfileBundle\Entity\Profile\Gender\FemaleGender;
use ProfileBundle\Entity\Profile\Gender\MaleGender;
use ProfileBundle\Entity\Profile\Gender\NoneGender;
use ProfileBundle\Exception\UnknownGenderException;

abstract class Gender
{
    abstract public function getIntCode(): int;
    abstract public function getStringCode(): string;

    static public function createFromStringCode(string $code): Gender
    {
        switch (strtolower($code)) {
            default:
                throw new UnknownGenderException(sprintf('Gender with string code `%s` is unknown', $code));

            case NoneGender::STRING_CODE: return new NoneGender();
            case MaleGender::STRING_CODE: return new MaleGender();
            case FemaleGender::STRING_CODE: return new FemaleGender();
        }
    }

    static public function createFromIntCode(int $code): Gender
    {
        switch ($code) {
            default:
                throw new UnknownGenderException(sprintf('Gender with int code `%d` is unknown', $code));

            case NoneGender::INT_CODE: return new NoneGender();
            case MaleGender::INT_CODE: return new MaleGender();
            case FemaleGender::INT_CODE: return new FemaleGender();
        }
    }

    public function toJSON(): array
    {
        return [
            'int' => $this->getIntCode(),
            'string' => $this->getStringCode(),
        ];
    }
}