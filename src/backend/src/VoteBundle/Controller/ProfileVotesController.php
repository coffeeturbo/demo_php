<?php
namespace VoteBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\JsonResponse;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteType\VoteType;
use VoteBundle\Formatter\VotedContentFormatter;

class ProfileVotesController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Vote",
     *  description="Получаем лайки дизлайки профиля",
     *  authentication=true,
     *     statusCodes = {
     *      200 = "Успешно",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
     *      404 = "не найдено",
     *  }
     * )
     *
     */
    public function getVotesAction($vote_type, $content_type)
    {
        try {

            $profile = $this->get('profile.service')->getCurrentProfile();

            $voteType = VoteType::createFromStringCode($vote_type);
            $contentType = VoteContentType::createFromStringCode($content_type);

            $voteContent = $this->get('vote.service.vote_service')->getVotedContent($profile, $voteType, $contentType);

            $formatter = new VotedContentFormatter($voteContent);

        } catch(NoResultException $e){
            return new ErrorJsonResponse($e->getMessage(),$e->getTrace(), 404);
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }



        return new JsonResponse($formatter->format());

    }
}