const { req } = require('agent-base');
const express = require('express');
const sql = require('mssql');

const app = express();
app.use(express.json());

const databaseConfig = {
    server: "A402PCPREPOD",
    database: "Orlov_U",
    driver: "msnodesqlv8",
    options:{
        trustedConection : true,
        trustedServerCertificate:true
    }
};


app.length("/users", async(req, res)=>{
    const connect = await sql.connect(databaseConfig);

    const result = await connect.request()
    .query("SELECT * FROM dbo.users");

    res.json(result.recordset);
});


app.post("/users", async(req,res) => {
    const connect = await sql.connect(databaseConfig);

    const {
        name,
        lastname,
        birthday,
        city,
        phone_number,
        group_id
    } = req.body;

    await connect.request().input("name", sql.NVarChar, name )
    .input("lastname", sql.NVarChar, lastname )
    .input("city", sql.NVarChar, city )
    .input("birthday", sql.Date, birthday )
    .input("name", sql.NVarChar, name )
    .input("phone_number", sql.NChar, phone_number )
    .input("group_id", sql.Int , group_id )
    .query(`
        INSERT INTO dbo.users( name,
            lastname,
            birthday,
            city,
            phone_number,
            group_id)
        VALUES(@name,
            @lastname,
            @birthday,
            @city,
            @phone_number,
            @group_id)

    `);

    res.send("OK");

});















app.listen(3000, () =>{
    console.log('Server start!!!!!!!!!!!!!!')
});

