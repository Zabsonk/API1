<?php
    /** @var $auto ?\App\Model\Auto */
?>

<div class="form-group">
    <label for="year">Mark</label>
    <input type="text" id="subject" name="auto[subject]" value="<?= $auto ? $auto->getSubject() : '' ?>">
</div>

<div class="form-group">
    <label for="model">Model</label>
    <input type="text" id="model" name="auto[model]" value="<?= $auto ? $auto->getModel() : '' ?>">
</div>

<div class="form-group">
    <label for="year">Year</label>
    <input type="number" id="year" name="auto[year]" value="<?= $auto ? $auto->getYear() : '' ?>">
</div>

<div class="form-group">
    <label for="color">Color</label>
    <input type="text" id="color" name="auto[color]" value="<?= $auto ? $auto->getColor() : '' ?>">
</div>

<div class="form-group">
    <label for="engine">Engine</label>
    <input type="text" id="engine" name="auto[engine]" value="<?= $auto ? $auto->getEngine() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Content</label>
    <textarea id="content" name="auto[content]"><?= $auto? $auto->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
