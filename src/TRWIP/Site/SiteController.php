<?php
require_once __DIR__.'/../bootstrap.php';

$site = $app['controllers_factory'];

$site->get('/login/apresentar', function () use ($app) {
    return $app['twig']->render('login.twig');
})
->bind('site_login');

$site->get('/login/validar', function (Request $req) use ($app) {
    //Validar o usuario
    $dados = $req->request->all();
    if (empty($dados)) {
        $app->abort(500, 'Por favor informe o email e a senha');
    }
    $app['usuario'] = 'JP';
    return $app['twig']->render('inicio.twig', array('nomUsuario'=>'JP'));
})
->bind('site_logar');

$site->get('/contato/apresentar', function () use ($app) {
    return $app['twig']->render('contato.twig');
})
->bind('site_contato');

$site->get('/contato/enviar', function (Request $req) use ($app) {
    $dados = $req->request->all();
    if (empty($dados)) {
        $app->abort(500, 'O que vc quer nos falar?');
    }
    //Set valores para o model gravar
    return $app['twig']->render('contato.twig', array('mensagem'=>'Mensagem enviada! Obrigado :)'));
})
->bind('site_contatoEnviar');

return $site;
