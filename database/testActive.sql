use sockserjos;

CREATE TABLE test_active(
id INT(11) auto_increment not null,
testId INT(11) not null,
primary key(id),
unique key testId_unique (testId),
constraint fkIdTestActive foreign key (testId) references test(id)
);
insert into test_active(testId) values (58);
select * from test_active;