const { options } = require('./options/mariaDB')
const knex = require('knex')(options);

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name')
    table.integer('price')
    table.string('thumbnail')
})
    .then(() => console.log("Table created"))
    .catch((err) => { console.log(err); throw Error })
    .finally(() => {
        knex.destroy();
    })