<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function load(ObjectManager $manager): void
    {
        // Adding some categories.
        foreach (['Software', 'Hardware', 'Autres'] as $categoryName) {
            $category = (new Category())
                ->setName($categoryName)
            ;

            $manager->persist($category);
        }

        $manager->flush();


        // Adding some products. Ici, je hardcode les id de catégories, dans la réalité, on les récupère après flush !

        $cat2 = $this->categoryRepository->find(2);
        $products = [
            (new Product())
                ->setCategory($cat2)
                ->setName('Ecran')
                ->setDescription("Une description longue")
                ->setPrice(82.32)
                ->setStock(20)
                ->setImage('image1.png')
            ,
            (new Product())
                ->setCategory($cat2)
                ->setName('PC Portable')
                ->setDescription("Une description longue")
                ->setPrice(642.54)
                ->setStock(10)
                ->setImage('image2.png')
            ,
            (new Product())
                ->setCategory($cat2)
                ->setName('Ecran')
                ->setDescription("Une description longue")
                ->setPrice(82.32)
                ->setStock(20)
                ->setImage('image1.png')
            ,
            (new Product())
                ->setCategory($cat2)
                ->setName('Disque SSD')
                ->setDescription("Une description longue")
                ->setPrice(150.41)
                ->setStock(52)
                ->setImage('image3.png')
            ,
            (new Product())
                ->setCategory($this->categoryRepository->find(1))
                ->setName('Biscuits')
                ->setDescription("Une description longue")
                ->setPrice(2.45)
                ->setStock(0)
                ->setImage('image4.png')
            ,
            (new Product())
                ->setCategory($cat2)
                ->setName('Smartphone')
                ->setDescription("Une description longue")
                ->setPrice(324.0)
                ->setStock(0)
                ->setImage('image5.png')
            ,
        ];

        array_map(fn($product) => $manager->persist($product), $products);
        $manager->flush();
    }
}