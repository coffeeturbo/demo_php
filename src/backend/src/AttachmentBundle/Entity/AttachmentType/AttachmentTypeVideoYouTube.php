<?php
namespace AttachmentBundle\Entity\AttachmentType;

class AttachmentTypeVideoYouTube extends AttachmentType
{
    const INT_CODE = 1;
    const STRING_CODE = 'attachment-video-youtube';


    function getIntCode()
    {
        return self::INT_CODE;
    }

    function getStringCode()
    {
        return self::STRING_CODE;
    }

}