const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send("app rodando");
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})