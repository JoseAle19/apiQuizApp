use sockserjos;

drop table adviserTeam;
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


insert into adviserTeam values(null,1, 15, 16, 'Espartas', 1);

select * from adviserTeam;

