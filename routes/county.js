var express = require('express');
var router = express.Router();
const conn = require('../dbconnect');

//http://127.0.0.1:3000
router.get('', function(req, res, next) {
  conn.query('SELECT * from country',(error,results) => {
      if (error) {
          console.log(error);
      }else{
        return res.status(200).json({
              status_code: '200',
              data:results
          })
      }
  })
});
//http://127.0.0.1:3000/county/THA
router.get('/:code', function(req, res, next) {
    let codeID = req.params.code;
    conn.query('SELECT * from country WHERE Code = ?',[codeID],(error,results) => {
        if (error) {
            console.log(error);
        }else{
          return res.status(200).json({
                status_code: '200',
                data:results[0]
            })
        }
    })
  });

//http://127.0.0.1:3000/county/city/THA
router.get('/city/:code', function(req, res, next) {
    let codeID = req.params.code;
    conn.query('SELECT * FROM city WHERE CountryCode = ?',[codeID],(error,results) => {
        if (error) {
            console.log(error);
        }else{
          return res.status(200).json({
                status_code: '200',
                data:results
            })
        }
    })
  });


//http://localhost:3000/county
router.post('/', function(req, res, next) {
    const {name,code,district,population} = req.body;
    let sql = `INSERT INTO city (Name, CountryCode, District,Population) 
    VALUES (?,?,?,?)`
    conn.query(sql,[name,code,district,population],(error,results) => {
      if(error){
        console.log(error);
      }else{
        return res.status(200).json({
          status_code:'200',
          data:'เพิ่มข้อมูลสำเร็จ'
        })
      }
    })
  });

//http://localhost:3000/county
router.put('/', function(req, res, next) {
    const {name,district,id} = req.body;
    let sql = `UPDATE city SET Name = ?,District=?
               WHERE ID = ?;`
    conn.query(sql,[name,district,id],(error,results) => {
      if(error){
        console.log(error);
      }else{
        return res.status(200).json({
          status_code:'200',
          data:'แก้ไขข้อมูลสำเร็จ'
        })
      }
    })
 });

//http://localhost:3000/county
router.post('/city', function(req, res, next) {
    const {id} = req.body;
    // let codeID = req.params.code;
    let sql = `DELETE FROM city WHERE ID = ?`
    conn.query(sql,[id],(error,results) => {
      if(error){
        console.log(error);
      }else{
        return res.status(200).json({
          status_code:'200',
          data:'ลบข้อมูลสำเร็จ'
        })
      }
    })
 });

module.exports = router;
