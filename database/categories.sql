use sockserjos;

create table category(
id int(11) not null auto_increment,
description varchar(100) not null,
primary key(id)
);
insert into category(description) values ('Matematicas');
insert into category(description) values ('Programacion');
insert into category(description) values ('Quimica');
insert into category(description) values ('Historia');  



select * from category;