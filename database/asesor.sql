use sockserjos;

drop table adviser;
CREATE TABLE adviser(
id INT(11) AUTO_INCREMENT NOT NULL,
institution VARCHAR(100) UNIQUE NOT NULL,
phone VARCHAR(10) UNIQUE NOT NULL,
PRIMARY KEY(id),
iduser INT(11) NOT NULL, 
 KEY iduser (iduser),
constraint user_advifk foreign key (iduser) references users(id) on delete cascade  on update cascade
);


insert into adviser(institution, phone, iduser, idrol) values('tec', 12333, 1, 1);
select * from adviser where phone = 21212121211;
select id from adviser where iduser = 17;



