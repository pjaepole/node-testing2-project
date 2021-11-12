const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /demon', () => {
  test('responds with all the characters', async () => {
    const res = await request(server).get('/demon')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(4)
  })
})

describe('[GET] /demon/:id', () => {
  test('responds with tanjiro', async () => {
    const res = await request(server).get('/demon/1')
    expect(res.body).toMatchObject({ id: 1, name: 'tanjiro' })
  })
})

describe('[POST] /demon', () => {
  test('responds with new character', async () => {
    const res = await request(server)
      .post('/demon').send({ name: 'rengoku' })
    expect(res.body).toMatchObject({ id: 5, name: "rengoku" })
  })
  test('responds with status 201', async () => {
    const res = await request(server)
      .post('/demon').send({ name: 'rengoku' })
    expect(res.status).toBe(201)
  })
})
