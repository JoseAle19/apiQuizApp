use sockserjos;

create table test(
id int(11) auto_increment not null,
name varchar(100) not null unique,
clave text(50) not null,
status_test boolean,
id_teacher int(11) not null,
key id_teacher(id_teacher),
constraint fkteacher foreign key (id_teacher) references users(id),
primary key (id)
);


insert into test(name, clave, status_test, id_teacher) values ('etsamen1', 'examen1', true, 3);
insert into test(name, clave, status_test, id_teacher) values ('testteacher', 'examen1', true, 10);
insert into test(name, clave, status_test, id_teacher) values ('testteache', 'examen1', true, 10);


select * from test where status_test = true;
delete  from test where id = 15;

select test.name, test.clave, users.name as 'Creador', users.email as 'Correo de contacto' from test inner join users on users.id = test.id_teacher;


 update test set status_test = 1 where id = 1;
##logi para cada examen 
select * from test;
select * from test where name = 'etsamen1' and clave = 'examen1'