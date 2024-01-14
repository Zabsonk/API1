<?php

/** @var \App\Model\Auto $auto */
/** @var \App\Service\Router $router */

$title = "{$auto->getSubject()} ({$auto->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $auto->getSubject() ?></h1>
    <p><?=$auto->getModel()?></p>
    <p><?=$auto->getYear()?></p>
    <p><?=$auto->getColor()?></p>
    <p><?=$auto->getEngine()?></p>
    <article>
        <?= $auto->getContent();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('auto-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('auto-edit', ['id'=> $auto->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
