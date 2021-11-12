const db = require('../../data/db-config')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('demon')
}

function getById(id) {
  return db('demon').where('id', id ).first()
}

async function insert(character) {
  // return db('demon').insert(character, ['id', 'name']) // postgres
  return db('demon').insert(character)
    .then(([id]) => {
      return getById(id)
    })
}

async function update(id, changes) {
  return null
}

async function remove(id) {
    const character = await db('demon').where('id',id).first()
    await db("demon").where('id',id).del()
    return character 
    // return db("demon")
    // .where("id", id)
    // .del()
}
