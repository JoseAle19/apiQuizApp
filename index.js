const express = require('express');
const app = express();

app.use('/users', require('./routes/user.routes'));
app.use('/roles', require('./routes/roles.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/questions', require('./routes/questions.routes'));
app.use('/categories', require('./routes/categories.routes'));
app.use('/adviser-team', require('./routes/adviserWithTeam.routes'));

module.exports = app;
