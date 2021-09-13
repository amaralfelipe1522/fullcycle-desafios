const express = require('express')
const mysql = require('mysql')
const random_name =  require('node-random-name');

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config)
const sqlCreate = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL auto_increment, name VARCHAR(250), PRIMARY KEY (id))`
connection.query(sqlCreate, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});
connection.end();

app.get('/', async(req, res) => {
    var names = [];
    const connection = mysql.createConnection(config);

    const sqlInsert = `INSERT INTO people(name) values('${random_name()}')`
    connection.query(sqlInsert, function (err, result) {
        if (err) throw err;
        console.log("Data entered");
    });
    
    connection.query('SELECT * FROM `people`', (error, results, fields)=> {
        results.map(name => names.push(name.name))
        res.send('<h1>Full Cycle Rocks!</h1><ul><li>'+names.join('</li><li>')+'</li></ul>')
    });

    connection.end();
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})