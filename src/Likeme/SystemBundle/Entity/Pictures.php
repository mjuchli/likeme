<?php

namespace Likeme\SystemBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Likeme\SystemBundle\Entity\Pictures
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Likeme\SystemBundle\Entity\PicturesRepository")
 */
class Pictures
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string $src
     *
     * @ORM\Column(name="src", type="string", length=255)
     */
    private $src;

    /**
     * @var integer $position
     *
     * @ORM\Column(name="position", type="integer")
     */
    private $position;

    /**
     * @var datetime $timestamp
     *
     * @ORM\Column(name="timestamp", type="datetime")
     */
    private $timestamp;

    
    /**
     * @ORM\ManyToOne(targetEntity="Likeme\SystemBundle\Entity\User", inversedBy="Pictures")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false, onDelete="cascade")
     */
    private $user;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set src
     *
     * @param string $src
     */
    public function setSrc($src)
    {
        $this->src = $src;
    }

    /**
     * Get src
     *
     * @return string 
     */
    public function getSrc()
    {
        return $this->src;
    }

    /**
     * Set position
     *
     * @param integer $position
     */
    public function setPosition($position)
    {
        $this->position = $position;
    }

    /**
     * Get position
     *
     * @return integer 
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Set timestamp
     *
     * @param datetime $timestamp
     */
    public function setTimestamp($timestamp)
    {
        $this->timestamp = $timestamp;
    }

    /**
     * Get timestamp
     *
     * @return datetime 
     */
    public function getTimestamp()
    {
        return $this->timestamp;
    }
}