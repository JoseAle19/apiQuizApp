use sockserjos;

CREATE TABLE IF NOT EXISTS test_questions (
  id INT(11) AUTO_INCREMENT NOT NULL,
  test_id INT(11) NOT NULL,
  question_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  KEY test_id (test_id),
  KEY question_id (question_id),
  CONSTRAINT fk_exam FOREIGN KEY (test_id) REFERENCES test (id),
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions (id) on delete cascade on update cascade
);

select * from test_questions;
INSERT INTO test_questions VALUES(null,1,4);

select * from test_questions;


SELECT test.name, test.year, questions.question, questions.answers FROM  
test_questions
INNER JOIN test ON test_questions.test_id = test.id
INNER JOIN questions ON test_questions.question_id= questions.id 
WHERE test.year = 2023 and test.name = '5to concuurso'

