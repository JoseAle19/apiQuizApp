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
insert into category(description) values ('Español');  
insert into category(description) values ('Ingles');  



select * from category;