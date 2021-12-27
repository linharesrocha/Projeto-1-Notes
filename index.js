const express = require("express");
const { engine } = require('express-handlebars')

const app = express();
const port = 8000;

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.use(express.static('public'));

const notesRoutes = require("./routes/notes")

app.get("/", (req, res) => {
    res.render('home')
});


app.use("/notes", notesRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})