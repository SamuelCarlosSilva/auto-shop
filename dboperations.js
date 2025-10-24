var config = require('./dbconfig');

const sql = require('mssql');

async function getCars(){
    try{
        let pool =  await sql.connect(config);
        let cars =  await pool.request().query('SELECT * FROM Cars');
        return cars.recordset;
    }catch(error){
        console.log(error);
        return [];
    }
}

module.exports = { getCars };