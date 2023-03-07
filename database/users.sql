
use sockSerJos;
## Comienza usuarios
drop table users;
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



delete from users where id = 3;
select * from users;
SELECT users.name, users.email, roles.des as rol  FROM users  inner join roles on roles.id = users.idrol;
