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
            .input('id', sql.Int, car.id)
            .input('brand', sql.NVarChar, car.brand)
            .input('model', sql.NVarChar, car.model)
            .input('year', sql.Int, car.year)
            .input('city', sql.NVarChar, car.city)
            .input('image', sql.NVarChar, car.image)
            .query(`UPDATE [dbo].[Cars] 
            SET
           [Brand] = @brand,
           [Model] = @model,
           [Year] = @year,
           [City] = @city,
           [Image] = @image
           WHERE ID = @id
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
            .input('id', sql.Int, car.id)
            .input('Brand', sql.NVarChar, car.brand)
            .input('Model', sql.NVarChar, car.model)
            .input('Year', sql.Int, car.year)
            .input('City', sql.NVarChar, car.city)
            .input('Image', sql.NVarChar, car.image)
            .query(`INSERT INTO [dbo].[Cars] 
            (id, Brand, Model, Year, City, Image)
            VALUES (
            @id,
            @Brand,
            @Model,
            @Year, 
            @City,
            @Image)
        `)
        return shop.recordset;
    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = { getCars, updateCar, getCar, deleteCar, addCar };