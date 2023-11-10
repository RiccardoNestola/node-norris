/* Esercizio
Sfruttando l’api https://api.chucknorris.io/jokes/random creare un applicazione che scarica una battuta random, la aggiunge ad un file json norrisDb.json e la mostra all’utente.
Il file json quindi dovrà contenere la lista di tutte le battute scaricate nell’arco del tempo.
E ricordate, con Chuck Norris le API non hanno il coraggio di ritornare un errore, per paura che Chuck le punisca.
    BONUS:
Quando viene scaricata una battuta, controllare che questa non sia già presente nel file json locale.Se lo è, caricare un altra battuta. */

const http = require("http");
require("dotenv").config();
const port = process.env.PORT || 8080;
const loadApi = require("./utilities/loadApi");
const { addItemToDb } = require("./utilities/func");


const server = http.createServer((req, res) => {
    const url = "https://api.chucknorris.io/jokes/random";
    
    
    const fetch = () => {
        loadApi(url, (data) => {
            const wasAdded = addItemToDb(data);

            if (wasAdded) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.write(
                    `<h1>${data.value}</h1>`
                );
                res.end();
            } else {
                res.status(409).send({ message: "Già esistente" });
            }

        })
    }
    fetch();

});


server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});