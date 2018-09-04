<?php
namespace VoteBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use VoteBundle\Formatter\VotedContentFormatter;
use VoteBundle\Handler\VotedContentHandler;

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
    public function getVotesAction(Request $request)
    {
        try {

            $criteria = (new VotedContentHandler($request))->getCriteria();

            $profileId = $this->get('profile.service')->getCurrentProfile()->getId();
            if(!$criteria->getProfileId()) $criteria->setProfileId($profileId);

            $voteContent = $this->get('vote.service.vote_service')->getVotedContent($criteria);

            $formatter = new VotedContentFormatter($voteContent);

        } catch(NoResultException $e){
            return new ErrorJsonResponse($e->getMessage(),$e->getTrace(), 404);
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }


        return new JsonResponse($formatter->format());
    }
}