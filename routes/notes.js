const Router = require("express").Router;
const db = require("../db/connection");
const { ObjectId } = require("mongodb");

const router = Router();

router.get("/edit/:id", async (req, res) => {
    const id = new ObjectId(req.params.id);

    const note = await db.getDb().db().collection("notes").findOne({ _id: id });

    res.render("notes/edit", {note});
})

router.get("/:id", async (req, res) => {
    const id = new ObjectId(req.params.id);

    const note = await db.getDb().db().collection("notes").findOne( {_id: id} );

    res.render("notes/detail", { note });
});

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
});

router.post("/update", (req, res) => {
    const data = req.body;
    const id = new ObjectId(data.id);
    const title = data.title;
    const description = data.description;

    db.getDb().db().collection("notes").updateOne({ _id: id}, {$set: {title: title, description: description}});

    res.redirect("/")
});

router.post("/delete", (req, res) => {
    const data = req.body;
    const id = new ObjectId(data.id);

    db.getDb().db().collection("notes").deleteOne({_id: id});

    res.redirect("/")
});

module.exports = router;