<?php
namespace AttachmentBundle\Entity\AttachmentType;

class AttachmentTypeImage extends AttachmentType
{
    const INT_CODE = 3;
    const STRING_CODE = 'attachment-image';

    function getIntCode()
    {
        return self::INT_CODE;
    }

    function getStringCode()
    {
        return self::STRING_CODE;
    }

}