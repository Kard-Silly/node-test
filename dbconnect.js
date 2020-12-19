const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:''
});
// connection.connect((error) => {
//     if(error){
//         console.log(error);
//     }else{
//         console.log("Connected...");
//     }
// })
module.exports = connection;