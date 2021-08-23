const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreate = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL auto_increment, name VARCHAR(250), PRIMARY KEY (id))`
connection.query(sqlCreate, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

const sqlInsert = `INSERT INTO people(name) values('Felipe Amaral')`
connection.query(sqlInsert, function (err, result) {
    if (err) throw err;
    console.log("Data entered");
});

connection.end()


app.get('/', (req,res) => {
    res.send('<h1>Full Cycle Rocks!</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})