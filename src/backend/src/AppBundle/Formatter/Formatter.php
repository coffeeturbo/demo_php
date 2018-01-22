<?php
namespace AppBundle\Formatter;

abstract class Formatter
{
    protected $resource;

    public function __construct($resource = null)
    {
        $this->resource = $resource;
    }

    abstract function format();
}