<?php

/** @var \App\Model\Post[] $posts */
/** @var \App\Service\Router $router */

$title = 'Post List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>MERCEDES BMW AUDI</h1>

    <a href="<?= $router->generatePath('post-create') ?>">Create new Car</a>

    <ul class="index-list">
        <?php foreach ($posts as $post): ?>
            <li><h3><?= $post->getSubject() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('post-show', ['id' => $post->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('post-edit', ['id' => $post->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
