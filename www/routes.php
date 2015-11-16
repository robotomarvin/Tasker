<?php

$router->addGet('HomePage.index', '/');
$router->addGet('HomePage.filter', '/filter');

$router->addGet('User.show', '/users/{id}');
$router->addGet('User.add', '/register');
$router->addPost('User.create', '/register');

$router->addGet('Note.show_all', '/notes');
$router->addGet('Note.show', '/notes/{id}');
$router->addGet('Note.add', '/notes/add');
$router->addPost('Note.create', '/notes/create');