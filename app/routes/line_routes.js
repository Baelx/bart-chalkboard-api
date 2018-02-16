var ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db){
  app.get("/lines/:id", (req, res) => {
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    db.collection("lines").findOne(details, (err, item) => {
      if (err){
        res.send({"error": "An error has occured. Don't have a cow, man."});
      } else {
        res.send(item)
      }
    });
  });

  app.delete("/lines/:id", (req, res) => {
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    db.collection("lines").remove(details, (err, item) => {
      if (err){
        res.send({"error": "An error has occured. Don't have a cow, man."});
      } else {
        res.send("Chalkboard line " + id + " erased! I didn't do it!")
      }
    });
  });

  app.put("/lines/:id", (req, res) => {
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    const entry = { line: req.body.line, episode: req.body.episode, season: req.body.season}
    db.collection("lines").update(details, entry, (err, item) => {
      if (err){
        res.send({"error": "An error has occured. Don't have a cow, man."});
      } else {
        res.send(item)
      }
    });
  });

  app.post("/lines", (req, res) => {
    const entry = { line: req.body.line, episode: req.body.episode, season: req.body.season}
    db.collection("lines").insert(entry, (err, result) => {
      if (err){
        res.send({"error": "An error has occured. Don't have a cow, man."});
      } else {
        res.send(result.ops[0])
      }
    });
  });
};
