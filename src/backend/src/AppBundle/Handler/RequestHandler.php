<?php
namespace AppBundle\Handler;

use Symfony\Component\HttpFoundation\Request;

interface RequestHandler
{
    public function handleRequest( Request $request);
    public function getCriteria();
}