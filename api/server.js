const express = require('express')
const Demon = require('./demon/demon-model')
const server = express()
server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

  server.get("/demon", (req, res) => {
    Demon.getAll()
      .then(char => {
        res.status(200).json(char);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.get("/demon/:id", async (req, res) => {
    res.json(await Demon.getById(req.params.id))
  });
  
  server.post("/demon", async (req, res) => {
    res
    .status(201)
    .json(await Demon.insert(req.body))
  });
  
  server.delete("/demon/:id", (req, res) => {
    res.end()
  });
  
  server.put("/demon/:id", (req, res) => {
    res.end()
  });

  module.exports = server