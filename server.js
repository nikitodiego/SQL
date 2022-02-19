
const express = require('express');
const app = express();
const { Router } = require('express');
const router = Router();


//Middlewares
app.use('/api/productos', router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//Websocket
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//Config SQLite3
const { optionsSQLite } = require('./options/SQLite3');
const knexSQLite = require('knex')(optionsSQLite)

//Config MariaDB
const { options } = require('./options/mariaDB')
const knex = require('knex')(options);

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado', socket.id);
    socket.on('new-message', data => {
        console.log(data);
        knexSQLite('chat').insert(data)
            .then(data => console.log(data))
            .catch((err) => { console.log(err) })
    });

    knexSQLite.from('chat').select("*")
        .then(data => io.sockets.emit('messages', data))
        .catch((err) => { console.log(err) })

    knex.from('products').select("*")
        .then(data => io.sockets.emit('productos', data))

});

//Endpoints CRUD
app.get('/', (req, res) => {
    res.redirect("/form.html")
})

router.get('/', (req, res) => {
    knex.from('products').select("*")
        .then(data => res.send(data))
        .catch((err) => { console.log(err) })
})

app.post('/form.html', (req, res) => {
    knex('products').insert(req.body)
        .then(() => console.log("data inserted"))
        .then(res.redirect("/form.html"))
        .catch((err) => { console.log(err) })
});

app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    knex.from('products').where('id', '=', id).update(req.body)
        .then(() => console.log("data updated"))
        .then(res.redirect("/form.html"))
        .catch((err) => { console.log(err) })
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await knex.from('products').where('id', '=', id).del()
        .then(() => console.log("data deleted"))
        .then(res.redirect("/form.html"))
        .catch((err) => { console.log(err) })
});


httpServer.listen(3000, function () {
    console.log('Servidor corriendo en http://localhost:3000');
})
