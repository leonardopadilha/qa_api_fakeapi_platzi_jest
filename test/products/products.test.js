import request from 'supertest';
import { describe, expect, it } from '@jest/globals'
import getId from '../../functions/getId.js';

import 'dotenv/config'

const BASE_URL = process.env.BASE_URL

describe("#Products", () => {
  describe("GET /products", () => {
    it("Deve retornar todos os produtos", async() => {
      const response = await request(BASE_URL).get('/products')
      expect(response.status).toEqual(200)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body[getId(response)].id).not.toBeNull()
      expect(response.body[getId(response)].id).not.toBeUndefined()
    })

    it("Não deve retornar um produto inexistente", async() => {
      const response = await request(BASE_URL).get('/products/000')
      expect(response.status).toEqual(400)
      expect(response.body.name).toEqual("EntityNotFoundError")
      expect(response.body.message).toContain("Could not find any entity of type")
    })
  })
})

