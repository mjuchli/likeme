<?php

namespace Likeme\SystemBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Likeme\SystemBundle\Form\Type\PreferenceFormType;
use FOS\UserBundle\Controller\ProfileController as BaseController;
use Likeme\SystemBundle\Form\Type\ProfileFormType;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class ProfileController extends Controller {
	
	
	public function __construct() {
		$this->fos = new BaseController();
	}
	
	public function isActive() {
		$user = $this->container->get('security.context')->getToken()->getUser();
		$active = $user->getactive();

		return $active;
	}

	/**
	 * @Route("/profile", name="profile")
	 * @Template()
	 */
	public function showAction() {
		$user = $this->container->get('security.context')->getToken()->getUser();

		if (!is_object($user) || !$user instanceof UserInterface) {
			throw new AccessDeniedException('This user does not have access to this section.');
		}
		
		$em = $this->container->get('doctrine')->getEntityManager();
		// Get current user
		$curUser = $em->getRepository('LikemeSystemBundle:User')->findOneByUsername($user);
		
		// Build form
		$form = $this->container->get('form.factory')->create(new ProfileFormType(), $curUser);
	
		// Get Pictures
		$query = $em->createQueryBuilder()
		->from('Likeme\SystemBundle\Entity\Pictures', 'p')
		->select("p.src")
		->where("p.user = :userid AND p.type = :type")
		->setParameter('userid', $curUser->getId())
		->setParameter('type', 'original');
		
		$allpictures = $query->getQuery()->getResult();
		
		// Edit picture links for LiipImagineBundle
		$imagineservice = $this->container->get('likeme.liipimaginebundle.getlinks');
		$imaginelinks = $imagineservice->editLinks($allpictures);
		
		//Embedded Form Handler
		$request = $this->getRequest();
		if ($request->getMethod() == 'POST') {
			$form->bindRequest($request);

			$validator = $this->get('validator');
			$errors = $validator->validate($user);
			print_r($errors);	
			if ($form->isValid()) {
				$em->persist($user);
				$em->flush();
								
				return new RedirectResponse($this->container->get('router')->generate('fos_user_profile_show'));
			}			
		}
		
		if ($this->container->get('request')->isXmlHttpRequest())
		{
			if(!empty($errors)) {
				$return = json_encode($errors);
				return new Response($return, 200, array('Content-Type' => 'application/json'));
			}
		}
		
		return $this->container->get('templating')->renderResponse('FOSUserBundle:Profile:show.html.'. $this->container->getParameter('fos_user.template.engine'),
				array('form' => $form->createView(), 'theme' => $this->container->getParameter('fos_user.template.theme'), 'user' => $user, 'active' => self::isActive(), 'pictures' => $imaginelinks)
		);

	}


}
