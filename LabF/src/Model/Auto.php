<?php
namespace App\Model;

use App\Service\Config;

class Auto
{
    private ?int $id = null;
    private ?string $subject = null;
    private ?string $model = null;
    private ?int $year = null;
    private ?string $color = null;
    private ?string $engine= null;
    private ?string $content = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Auto
    {
        $this->id = $id;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): Auto
    {
        $this->subject = $subject;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content):Auto
    {
        $this->content = $content;

        return $this;
    }
    public function setModel(?string $model):Auto{
        $this->model=$model;
        return $this;
    }
    public function getModel():?string{
        return $this->model;
    }

    public function getYear():?int{
        return $this->year;
    }
    public function setYear(?int $year):Auto{
        $this->year=$year;
        return $this;
    }
    public function getColor():?string{
        return $this->color;
    }
    public function setColor(?string $color):Auto{
        $this->color=$color;
        return $this;
    }
    public function getEngine():?string{
        return $this->engine;
    }
    public function setEngine(?string $engine):Auto{
        $this->engine=$engine;
        return $this;
    }
    public static function fromArray($array): Auto
    {
        $auto = new self();
        $auto->fill($array);

        return $auto;
    }

    public function fill($array): Auto
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['subject'])) {
            $this->setSubject($array['subject']);
        }
        if (isset($array['model'])) {
            $this->setModel($array['model']);
        }
        if (isset($array['year'])) {
            $this->setYear($array['year']);
        }
        if (isset($array['color'])) {
            $this->setColor($array['color']);
        }
        if (isset($array['engine'])) {
            $this->setEngine($array['engine']);
        }
        if (isset($array['content'])) {
            $this->setContent($array['content']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM auto';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $autos = [];
        $autosArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($autosArray as $autoArray) {
            $autos[] = self::fromArray($autoArray);
        }

        return $autos;
    }

    public static function find($id): ?Auto
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM auto WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $autoArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $autoArray) {
            return null;
        }
        $auto = Auto::fromArray($autoArray);

        return $auto;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO auto (subject, content,model,year,color,engine) VALUES (:subject, :content,:model,:year,:color,:engine)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':subject' => $this->getSubject(),
                'model' => $this->getModel(),
                'year' => $this->getYear(),
                'color' => $this->getColor(),
                'engine' => $this->getEngine(),
                ':content' => $this->getContent()
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE auto SET subject = :subject, model =: model,year=:year,color=:color,engine=:engine, content = :content WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':subject' => $this->getSubject(),
                'model' => $this->getModel(),
                'year' => $this->getYear(),
                'color' => $this->getColor(),
                'engine' => $this->getEngine(),
                'content' => $this->getContent(),
                ':id' => $this->getId()
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM auto WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setSubject(null);
        $this->setModel(null);
        $this->setYear(null);
        $this->setColor(null);
        $this->setEngine(null);
        $this->setContent(null);
    }
}
