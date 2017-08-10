<?php
namespace AttachmentBundle\LinkMetadata\Properties;

interface HasPreview
{
    public function getPreviewStoragePath(): string;
    public function getPreviewPublicPath(): string;
    public function setPreview(string $storage, string $public);
}