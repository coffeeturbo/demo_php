<?php
/**
 * User: savuskinvaceslav
 * Date: 17.09.17
 * Time: 14:30
 * To change this template use File | Settings | File Templates.
 */
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