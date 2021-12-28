const Router = require("express").Router;
const db = require("../db/connection");
const { ObjectId } = require("mongodb");

const router = Router();

router.get("/", (req, res) => {
    res.render('notes/create');
});

router.post("/", (req, res) => {

    const { title, description } = req.body;

    db.getDb()
    .db()
    .collection("notes")
    .insertOne({ title: title, description: description});

    res.redirect("/");
})

module.exports = router;