const mysql=require("mysql2");
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"shop_tech",
    password:"mysqladmin123"
});
module.exports=connection.promise();