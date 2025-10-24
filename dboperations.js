var config = require('./dbconfig');

const sql = require('mssql');

async function getCars() {
    try {
        let pool = await sql.connect(config);
        let cars = await pool.request().query('SELECT * FROM Cars');
        return cars.recordset;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function updateCar(car) {
    try {
        let pool = await sql.connect(config);
        let shop = await pool.request()
            .input('input_parameter', sql.Int, car.id)
            .query(`UPDATE [dbo].[Cars] 
            SET
           [Brand] = ${car.brand},
           [Model] = ${car.model},
           [Year] = ${car.year},
           [City] = ${car.city},
           [Image] = ${car.image}
           WHERE ID = @input_parameter
        `);
        return shop.recordset;
    } catch (error) {
        console.log(error);
        return [];
    }

}

async function getCar(id) {
    try {
        let pool = await sql.connect(config);
        let shop = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query(`SELECT * FROM [dbo].[Cars] WHERE ID = @input_parameter`);
        return shop.recordset;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteCar(id) {
    try {
        let pool = await sql.connect(config);
        let shop = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query(`DELETE FROM [dbo].[Cars] WHERE ID = @input_parameter`);
        return shop.recordset;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function addCar(car) {
    try {
        let pool = await sql.connect(config);
        let shop = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query(`INSERT INTO [dbo].[Cars] 
            (id, Brand, Model, Year, City, Image)
            VALUES (
            ${car.id},
            ${car.brand},
            ${car.model},
            ${car.year}, 
            ${car.city},
            ${car.image})
        `)
        return shop.recordset;
    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = { getCars, updateCar, getCar, deleteCar, addCar };