<?php
namespace AttachmentBundle\LinkMetadata;


interface LinkMetadata extends \JsonSerializable
{
    public function getTitle(): string;
    public function getDescription(): string;
    public function getURL(): string;
    public function getResourceType(): string;
    public function getId();
}