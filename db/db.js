const mysql = require("mysql2")
const config = require("./config")


const connectDB = async () => {
    const pool = mysql.createPool(config);

    pool.getConnection ((err, connection)=> {
        if(err){
            console.log({error : err.message});
            return
        }

        console.log("Connected to mysql Database")
        connection.release();
    });
};

module.exports = connectDB;