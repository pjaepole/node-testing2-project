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
  
  server.delete("/demon/:id", async (req, res, next) => {
   const id=req.params.id
   const delCharacter = await Demon.remove(id)
   if(!delCharacter){
     res.status(404).json({message:'not found'})
   } else{res.status(200).json({message:"character deleted",delCharacter})}
  });
  
  server.put("/demon/:id", (req, res) => {
    res.end()
  });


  server.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
      customMessage: "something bad happend ",
      message: err.message,
      stack:err.stack,
    })
  })
  module.exports = server