use sockserjos;


CREATE TABLE IF NOT EXISTS test(
id INT(11) NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
duration INT(11) NOT NULL,
year YEAR,
start_test DATETIME NOT NULL,
end_test DATETIME NOT NULL,
status BOOLEAN NOT NULL,
PRIMARY KEY(id)
);
INSERT INTO test values(null,
'7mo concurso', 12, '2023-04-02 14:30:00', '2023-04-02 16:30:00', TRUE, 2023
);

select * from test;  



##Agregar la columna de year a mi tabla
ALTER TABLE test ADD year YEAR;

