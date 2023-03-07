use sockserjos;
drop table adviser;
CREATE TABLE adviser(
id INT(11) AUTO_INCREMENT NOT NULL,
nameAdviser VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
pass text(50) NOT NULL,
institution VARCHAR(100) UNIQUE NOT NULL,
phone VARCHAR(10) UNIQUE NOT NULL,
PRIMARY KEY(id),
idrol INT(11) not null,
KEY idrol (idrol),
constraint rol_adviFK foreign key (idrol) references roles(id)  on delete cascade on update cascade
);

select * from adviser