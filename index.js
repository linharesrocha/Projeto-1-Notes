const express = require("express");
const { engine } = require('express-handlebars')

const app = express();
const port = 8000;

const db = require("./db/connection")

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notesRoutes = require("./routes/notes")

app.get("/", async (req, res) => {
        const notes = await db.getDb().db().collection("notes").find({}).toArray();

        res.render('home', {notes});
});


app.use("/notes", notesRoutes);


db.initDb((err, db) => {
    if(err) {
        console.log(err);
    }else {
        console.log("O banco conectou com sucesso!");
        app.listen(port, () => {
            console.log(`Projeto rodando na porta: ${port}`);
        })
    }
})