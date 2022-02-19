const { optionsSQLite } = require('./options/SQLite3');
const knex = require('knex')(optionsSQLite)

const messages = [
    { autor: "nikitodiego@gmail.com", date: "2022-01-29T18:59:43.106Z", text: "¡Hola! ¿Que tal?" },
    { autor: "pedro@gmail.com", date: "2022-01-29T18:59:43.106Z", text: "¡Muy bien! ¿Y vos?" },
    { autor: "ana@gmail.com", date: "2022-01-29T18:59:43.106Z", text: "¡Genial!" }
];

knex('chat').insert(messages)
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw Error })
    .finally(() => {
        knex.destroy()
    })