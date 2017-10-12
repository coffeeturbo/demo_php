<?php
namespace AttachmentBundle\Entity\AttachmentType;

class AttachmentTypeText extends AttachmentType
{
    const INT_CODE = 2;
    const STRING_CODE = 'attachment-text';

    function getIntCode()
    {
        return self::INT_CODE;
    }

    function getStringCode()
    {
        return self::STRING_CODE;
    }
}