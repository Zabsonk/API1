create table post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    subject text not null,
    content text not null
);
create table auto
(
    id      integer not null
        constraint auto_pk
            primary key autoincrement,
    subject text not null,
    model text not null,
    year text not null,
    color text not null,
    engine text not null,
    content text not null

);