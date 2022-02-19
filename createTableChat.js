const { optionsSQLite } = require('./options/SQLite3');
const knex = require('knex')(optionsSQLite)

knex.schema.createTable('chat', table =>{
    //table.increments('id')
    table.string('autor')
    table.integer('date')
    table.string('text')
})
    .then(() => console.log("Table created"))
    .catch((err) =>{console.log(err); throw Error})
    .finally(() => {
        knex.destroy();
    })