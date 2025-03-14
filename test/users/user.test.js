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
  })
})