<?php
require_once __DIR__.'/../bootstrap.php';

$viagem = $app['controllers_factory'];

$viagem->get('/pesquisar', function () use ($app) {
    return $app['twig']->render('encontrarViagem.twig');
})->bind('viagem_pesquisa');

//Listas as últimas viagens cadastradas para que o  viajante
//nao tenha que pesquisar, apenas clicar e participar de uma
$viagem->get('/ofertar/{cidade}', function (Silex\Application $app, $cidade) use ($ofertas) {
    if (empty($ofertas)) {
        $app->abort(500, 'Ops... Estamos sem ofertas no momento.');
    }
    return new Response('Ofertas da cidade: '.$ofertas['cidade'], 200);
})->bind('viagem_ofertaPorCidade');

//Visualizar as viagens de um pais
$viagem->get('/listar/{pais}', function (Silex\Application $app, $pais) use ($viagens) {
    if (empty($viagens[$id-1])) {
        $app->abort(500, 'Ops... houve um problema para mostrar os dados da sua próxima viagem. Pesquise novamente.');
    }
    return $app->json($viagens);
})
->bind('viagem_listaPorPais')
->value('pais', 'Brasil');

//Visualizar os dados de uma viagem
$viagem->get('/visualizar/{id}', function (Silex\Application $app, $id) use ($viagens) {
    if (empty($viagens[$id-1])) {
        $app->abort(500, 'Ops... houve um problema para mostrar os dados da sua próxima viagem. Pesquise novamente.');
    }
    return Response('Dados da viagem - '.$viagems[$id-1]['titulo'], 200);
})
->bind('viagem_visualizacao')
->assert('id', '\d+');

//Participar de uma viagem
$viagem->get('/participar', function (Silex\Application $app, $login) {
    if (empty($login)) {
        $app->abort(500, 'Ops... houve um problema para mostrar os dados da sua próxima viagem. Pesquise novamente.');
    }
    return Response('Sucesso na sua próxima viagem!', 200);
})->bind('viagem_participacao');

$viagem->get('/apresentar', function () use ($app) {
    return $app['twig']->render('criarViagem.twig');
})->bind('viagem_cadastro');

$viagem->get('/salvar', function (Silex\Application $app, Request $req) use ($em) {
    $data = $req->request->all();
    $viagem = new \TRWIP\Viagem\ViagemModel;
    //$viagem->setTitulo($data['titulo']);
    //$viagem->setConteudo($data['cidade']);

    //$em->persist($post);
    //$em->flush();

    //if ($post->getId()) {
    //    return $app->redirect($app['url_generator']->generate('sucesso'));
    //} else {
    //    $app->abort(500, 'Erro ao salvar');

    return 'Viagem cadastrada!';
})->bind('viagem_inclusao');

return $viagem;
