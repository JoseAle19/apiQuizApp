use sockserjos;

 CREATE TABLE adviserTeam(
id INT(11) AUTO_INCREMENT  primary KEY ,
id1 INT(11) NOT NULL,
id2 INT(11) NOT NULL,
idLeader INT(11) NOT NULL,
nameTeam VARCHAR(100) NOT NULL ,
idAdviser INT(11) NOT NULL,
KEY id1 (id1),
KEY id2  (id2),
KEY idLeader (idLeader),
KEY idAdviser (idAdviser ),
constraint adviserFK foreign key(idAdviser) references adviser(id) on delete cascade on update cascade,
constraint id1FK foreign key(id1) references users(id) on delete cascade on update cascade,
constraint id2FK foreign key(id2) references users(id) on delete cascade on update cascade,
constraint idLeaderFK foreign key(idLeader) references users(id) on delete cascade on update cascade
);


insert into a.adviserTeam values(null,1, 15, 16, 'Espartas', 1);

select 
nameTeam,
user1.name as 'Estudiante 1' , 
user1.email as 'e1', 
user2.name  as 'Estudiante 2',
user2.email as 'e2' , 
user3.name as 'Estudiante 3',
user3.email as 'e3'
from adviserTeam a
inner join users user1 on user1.id = a.id1
inner join users user2 on user2.id = a.id2
inner join users user3 on user3.id = a.idLeader
inner join adviser adviserTeam on adviserTeam.id = a.idAdviser 
WHERE idAdviser=5;

select * from adviserTeam;




