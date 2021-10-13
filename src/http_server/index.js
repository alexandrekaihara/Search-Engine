const express = require('express')
const {spawn} = require('child_process');
const app = express()

app.get('/:search', (req, res) => {

 const {search} = req.params;
 var data;

 // Caso a busca seja feita em javascript, avisar o Pedro Luis para alterar o servidor

 const python = spawn('python', ['script1.py', search]);

 python.stdout.on('data', function (py_data) {
  data = py_data.toString();
 });

 python.on('close', (status) => {
    console.log(`child process close all stdio with code ${status}`);
    res.send(data)
 });
 
})
const port = 3000
app.listen(port, console.log(`Listening on port ${port}`))