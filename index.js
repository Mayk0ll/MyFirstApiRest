// import http from 'http';

/*

const http = require('http');

const app = http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type':"text/plain"})
    res.end('Hola parchero')
})

const PORT = 3001;
app.listen(PORT);
console.log(`Ejecutando server en el puerto: ${PORT}`);

*/
/*
const http = require('http');
const notas = require('./notas')

const app = http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type':"application/json"})
    res.end(JSON.stringify(notas))
})
const PORT = 3001;
app.listen(PORT);
console.log(`Ejecutando server en el puerto: ${PORT}`); 

*/

const express = require('express');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
let {notas} = require('./notas')


app.use((req, res, next) =>{
    console.log(req.method);
    console.log(req.path);
    console.log(req.body);
    next();
})

app.get('/', (req, res) => {
    res.send('<h1>Hola mundo</h1>')
})

app.get('/api/notas', (req, res) => {
    res.json(notas)
})

app.get('/api/notas/:id', (req, res) => {
    const {id} = req.params
    const note = notas.find( elem => {
        return elem.id === Number(id)
    })
    if (note) {
        return res.json(note)
    }
    res.status(404).send('no se encontro nada')
})

app.post('/api/notas', (req, res) => {
    const note = req.body
    const id = notas.length + 1;
    const date = new Date();
    let addNote = {
        id: id,
        content: note.content,
        date: date,
        important: note.important
    }
    notas = [...notas, addNote]
    res.json(addNote)
})

app.delete('/api/notas/:id', (req, res) => {
    const {id} = req.params
    notas= notas.filter( elem => {
        return elem.id !== Number(id)
    })
    if (notas) {
        return res.json(notas)
    }
    res.status(404).end()
})


app.use((req, res) => {
    res.status(404).json('Error 404, pag. no encontrada')
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Ejecutando server en el puerto: ${PORT}`);
});