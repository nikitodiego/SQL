const { options } = require('./options/mariaDB')
const knex = require('knex')(options);

const messages = [{ "title": "Big Data con Python", "price": 2500, "thumbnail": "img/img01.png", "stock": 0, "id": 1 }, { "title": "HTML5, CSS y JavaScript", "price": "3200", "thumbnail": "img/img02.png", "stock": 5, "id": 8 }, { "title": "Node JS", "price": "2800", "thumbnail": "img/img03.png", "stock": 8, "id": 9 }, { "title": "Python fácil", "price": "1800", "thumbnail": "img/img04.png", "stock": 13, "id": 10 }, { "title": "Docker", "price": "3400", "thumbnail": "img/img05.png", "stock": 29, "id": 11 }, { "title": "PostgreSQL", "price": "4000", "thumbnail": "img/img06.png", "stock": 19, "id": 12 }]

knex('chat').insert(messages)
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw Error })
    .finally(() => {
        knex.destroy()
    })