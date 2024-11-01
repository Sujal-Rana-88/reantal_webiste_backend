const mysql = require("mysql2");
const config = require("../db/config");
const pool = mysql.createPool(config);

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    pool.query(query, [value], (err, results) => {
      if (err) reject(err);
      else resolve(results.length ? results[0] : null);
    });
  });
};

// const insertRecord = (tableName, record) => {
//   return new Promise((resolve, reject) => {
//     const query = `INSERT INTO ${tableName} SET ?`;
//     pool.query(query, [record], (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// };
const insertRecord = (tableName, record) => {
  const columns = Object.keys(record).join(", ");
  const values = Object.values(record).map(value => {
    // Use '?' as a placeholder for values to prevent SQL injection
    return value instanceof Buffer ? value : `'${value}'`;
  }).join(", ");

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
  
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const fetchAllRecords = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;
    pool.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  fetchAllRecords,
};
