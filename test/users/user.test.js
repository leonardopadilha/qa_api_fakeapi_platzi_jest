import request from 'supertest';
import { describe, expect, it, jest } from '@jest/globals'
import getId from '../../functions/getId.js'
import newUser from '../../functions/newUser.js';

import 'dotenv/config'

const BASE_URL = process.env.BASE_URL

let id = 0;
let email = "";

describe("#Users", () => {
  describe("GET /users", () => {
    it("Deve retornar todos os usuários", async () => {
      const users = await request(BASE_URL).get('/users')
  
      expect(users.status).toEqual(200)
      expect(users.body.length).toBeGreaterThan(0)
      expect(users.body[getId(users)].id).not.toBeNull()
      expect(users.body[getId(users)].id).not.toBeUndefined()
  
      expect(users.body[getId(users)].email).not.toBeNull()
  
      id = users.body[getId(users)].id
      email = users.body[getId(users)].email
    })

    it('Deve retornar apenas um usuário', async () => {
      const user = await request(BASE_URL).get(`/users/${id}`)
  
      expect(user.status).toEqual(200)
      expect(Object.keys(user.body).length).toEqual(8)
      expect(Object.keys(user.body)).toEqual(["id", "email", "password", "name", "role", "avatar", "creationAt", "updatedAt"])
  
      for (let userKey in user.body) {
        expect(userKey).not.toBeNull()
        expect(userKey).not.toBeUndefined()
      }
    })

    it('Deve retornar erro devido id do usuário inválido', async () => {
      const user = await request(BASE_URL).get(`/users/000`)
  
      expect(user.status).toEqual(400)
      expect(user.body.name).toEqual("EntityNotFoundError")
      expect(user.body.message).toContain("Could not find any entity")
    })
  })

  describe("POST /users/is-available", () => {
    it('Deve informar se o email já está cadastrado', async() => {
      const response = await request(BASE_URL)
                                .post('/users/is-available')
                                .set('Accept', 'application/json')
                                .send({ "email": `${email}` })
  
      expect(response.status).toEqual(201)
      expect(response.body.message).not.toBeTruthy()                
    })
  })
})