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

  describe('POST /users', () => {
    it('Deve cadastrar o usuário com sucesso', async() => {
      const user  = newUser()
      const response = await request(BASE_URL)
                                .post('/users')
                                .set('Accept', 'application/json')
                                .send(user)
  
      expect(response.status).toEqual(201)
      expect(Object.keys(response.body).length).toEqual(8)
      expect(Object.keys(response.body)).toEqual(["id", "email", "password", "name", "role", "avatar", "creationAt", "updatedAt"])
  
      for (let userKey in response.body) {
        expect(userKey).not.toBeNull()
        expect(userKey).not.toBeUndefined()
      }
    })

    it('Deve retornar retorno devido dados do usuário em branco', async() => {
      const response = await request(BASE_URL)
                                .post('/users')
                                .set('Accept', 'application/json')
                                .send()
  
      expect(response.status).toEqual(500)
      expect(response.body.message).toEqual("Internal server error")
    })

    it("Deve validar a obrigatoriedade do campo nome no momento do cadastro", async() => {
      const user = newUser()
      delete user.name

      const response = await request(BASE_URL)
                              .post('/users')
                              .set('Accept', 'application/json')
                              .send(user)

      expect(response.status).toEqual(500)
      expect(response.body.message).toEqual("Internal server error")
    })

    it("Deve validar a obrigatoriedade do campo email no momento do cadastro", async() => {
      const user = newUser()
      delete user.email

      const response = await request(BASE_URL)
                              .post('/users')
                              .set('Accept', 'application/json')
                              .send(user)

      expect(response.status).toEqual(400)
      expect(response.body.message).toEqual([
        "email should not be empty",
        "email must be an email"
      ])
    })

    it("Deve validar a obrigatoriedade do campo password no momento do cadastro", async() => {
      const user = newUser()
      delete user.password

      const response = await request(BASE_URL)
                              .post('/users')
                              .set('Accept', 'application/json')
                              .send(user)

      expect(response.status).toEqual(400)
      expect(response.body.message).toEqual([
        "password must be longer than or equal to 4 characters",
        "password should not be empty",
        "password must contain only letters and numbers"
      ])
    })

      it("Deve validar a obrigatoriedade do campo avatar no momento do cadastro", async() => {
        const user = newUser()
        delete user.avatar
  
        const response = await request(BASE_URL)
                                .post('/users')
                                .set('Accept', 'application/json')
                                .send(user)
  
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual([
          "avatar should not be empty",
          "avatar must be a URL address"
        ])
    })
  })
})