<?php
require_once __DIR__.'/../bootstrap.php';

$viajante = $app['controllers_factory'];

//Visualizar o perfil
$viajante->get('/visualizar/perfil', function (Silex\Application $app, $id) use ($viagens) {
    if (empty($viagens[$id-1])) {
        $app->abort(500, 'Ops... houve um problema para mostrar o seu perfil. Tente novamente.');
    }
    return Response('Seu perfil XXXXXX', 200);
})
->bind('viajante_perfil');

//Visualizar as participacoes em viagens
$viajante->get('/visualizar/viagens', function (Silex\Application $app, $id) use ($viagens) {
    if (empty($viagens[$id-1])) {
        $app->abort(500, 'Ops... houve um problema para listar suas viagens. Tente novamente.');
    }
    return $app->json($viagens);
})
->bind('viajante_viagens');

return $viajante;
