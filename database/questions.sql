use sockserjos;

create table questions(
id int(11) auto_increment not null,
question varchar(100) not null,
timeQ int(11),
answers json not null,
id_category int(11) not null,
id_teacher int(11) not null,
key id_teacher(id_teacher),
key id_category(id_category),
constraint fkteacher foreign key (id_teacher) references users(id),
constraint fkcategory foreign key (id_category) references category(id),
primary key (id)
);

insert into questions(question, timeQ, answers, id_teacher, id_category)  values 
('¿Como imprimir un mesage en java?',
 12,
'{
"answers": [ {
"answer": "df",
"correct": true
},{
"answer": "chiapas",
"correct": false
},{
"answer": "mexico",
"correct": false
},
{
"answer": "texas",
"correct": false
}
]
}',
22,
2
 );
 
 
select * from questions;
 