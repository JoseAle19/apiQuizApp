const con = require("../config/database");

const validateField = (sql) => {
  return new Promise((resolve, _) => {
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

module.exports = {
  validateField,
};
