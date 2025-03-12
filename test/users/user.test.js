import request from 'supertest';
import { describe, expect, it } from '@jest/globals'
import userId from '../../functions/getId.js'

import 'dotenv/config'

const BASE_URL = process.env.BASE_URL

let id = 0;
let email = "";

describe("/users", () => {
  it("GET /users", async () => {
    const users = await request(BASE_URL).get('/users')

    expect(users.status).toEqual(200)
    expect(users.body.length).toBeGreaterThan(0)
    expect(users.body[userId(users)].id).not.toBeNull()
    expect(users.body[userId(users)].id).not.toBeUndefined()

    expect(users.body[userId(users)].email).not.toBeNull()

    id = users.body[userId(users)].id
    email = users.body[userId(users)].email
  })

  it('GET /users/id', async () => {
    const user = await request(BASE_URL).get(`/users/${id}`)

    expect(user.status).toEqual(200)
    expect(Object.keys(user.body).length).toEqual(8)
    expect(Object.keys(user.body)).toEqual(["id", "email", "password", "name", "role", "avatar", "creationAt", "updatedAt"])

    for (let userKey in user.body) {
      expect(userKey).not.toBeNull()
      expect(userKey).not.toBeUndefined()
    }
  })

  it('POST /users/is-available', async() => {
    const response = await request(BASE_URL)
                              .post('/users/is-available')
                              .set('Accept', 'application/json')
                              .send({ "email": `${email}` })

    expect(response.status).toEqual(201)
    expect(response.body.message).not.toBeTruthy()                
  })
})