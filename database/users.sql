
use sockSerJos;



## Comienza usuarios
CREATE TABLE users(
	id INT(11) AUTO_INCREMENT not null,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL unique,
    password text(50) NOT NULL,	
    idrol int(11) not null,
    primary key(id),
    key idrol (idrol),
    constraint rolFK foreign key (idrol) references roles(id)
);

select * from users;
show tables ;

SELECT users.name, users.email, roles.des as rol  FROM users  inner join roles on roles.id = users.idrol;

alter table users add year YEAR;
select  * from users where idrol  = 1;
