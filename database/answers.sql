use sockserjos;

drop table answers;
create table answers(
id int(11) auto_increment not null,
description varchar(200) not null,
is_correct boolean not null,
id_question int(11) not null,
key id_question (id_question),
primary key (id),
constraint fkQuestion foreign key (id_question ) references questions(id)
);
insert into answers(description, is_correct, id_question) values('si', false, 2);
insert into answers(description, is_correct, id_question) values('quiza', false, 2);
insert into answers(description, is_correct, id_question) values('talves', false, 2);
insert into answers(description, is_correct, id_question) values('no lo se', true, 2);

select * from answers;

	select *
	from answers 
    inner join questions on answers.id_question = questions.id 
    inner join test on questions.id_test= test.id 
    where id_test = 1
    ;
    
    
    select * from answers 
    inner join questions on questions.id = answers.id_question where questions.id = 1 ;
    
    ALTER TABLE answers change description des varchar(100) NOT NULL;
	
    SELECT JSON_ARRAYAGG(JSON_OBJECT('idQ', questions.id, 'id', id)) from answers;




