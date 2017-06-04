<?php
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/src/TRWIP/bootstrap.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

//Dados de teste
$viagens = array(
  array('id' => 1, 'titulo' => 'viagem 1'),
  array('id' => 2, 'titulo' => 'viagem 2'),
  array('id' => 3, 'titulo' => 'viagem 3'),
  array('id' => 4, 'titulo' => 'viagem 4'),
  array('id' => 5, 'titulo' => 'viagem 5'),
  array('id' => 6, 'titulo' => 'viagem 6'),
  array('id' => 7, 'titulo' => 'viagem 7'),
  array('id' => 8, 'titulo' => 'viagem 8'),
  array('id' => 9, 'titulo' => 'viagem 9'),
  array('id' => 10, 'titulo' => 'viagem 10'));

$ofertas = array(
  array('id' => 1, 'cidade' => 'cidade 1'),
  array('id' => 2, 'cidade' => 'cidade 2'),
  array('id' => 3, 'cidade' => 'cidade 3'),
  array('id' => 4, 'cidade' => 'cidade 4'),
  array('id' => 5, 'cidade' => 'cidade 5'),
  array('id' => 6, 'cidade' => 'cidade 6'),
  array('id' => 7, 'cidade' => 'cidade 7'),
  array('id' => 8, 'cidade' => 'cidade 8'),
  array('id' => 9, 'cidade' => 'cidade 9'),
  array('id' => 10, 'cidade' => 'cidade 10'));

//Inicio
$app->get('/', function () use ($app) {
    return $app['twig']->render('inicio.twig');
})->bind('inicio');

$app->mount('/site', include __DIR__.'/src/TRWIP/Site/SiteController.php');
$app->mount('/viajante', include __DIR__.'/src/TRWIP/Viajante/ViajanteController.php');
$app->mount('/viagem', include __DIR__.'/src/TRWIP/Viagem/ViagemController.php');

$app->run();
