use sockSerJos;
DROP TABLE roles;
create table roles(
id int(11) auto_increment not null,
des varchar(50) not null,
primary key (id)
);

insert into roles(des) values ('Estudiante');
insert into roles(des) values ('Profesor');
insert into roles(des) values ('Administrador');
insert into roles(des) values ('asesor');
INSERT INTO roles(des) values ('lider');


select * from roles;
##Actualizar la descripcion de los roles 
update roles set des = 'Lider' where id = 5;
