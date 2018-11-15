<?php
namespace PostBundle\Tests\Path;

use Symfony\Component\HttpFoundation\Response;
use PostBundle\Tests\PostController;

class PostCreateActionTest extends PostController
{

    protected $fixtures;


    protected $post =[
        'title'=> 'Это пост',
        'tags' => '[{"name":"1"},  {"name":"2"}]'
    ];

    public function setUp()
    {
        parent::setUp();
    }

    public function getPathRequestClient($json)
    {
        return $this->client->request('PUT', '/protected/post/create', [], [], [], json_encode($json));
    }

    public function test200()
    {

        $profile = $this->getAuthClient();


        $this->getPathRequestClient($this->post);
        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());

//        $result = json_decode($response->getContent(), true);

//        print_r($result);
//        die;
//        $this->recursiveEquals($this->profile, $result['entity']);
    }
}