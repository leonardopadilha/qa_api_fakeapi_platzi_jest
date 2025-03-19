import request from 'supertest';
import { describe, expect, it } from '@jest/globals'
import getId from '../../functions/getId.js';
import newProduct from '../../functions/newProduct.js'
import data from '../support/fixtures/products.json'

import 'dotenv/config'

const BASE_URL = process.env.BASE_URL

let productId = 0

describe("#Products", () => {
  describe("GET /products", () => {
    it("Deve retornar todos os produtos", async() => {
      const response = await request(BASE_URL).get('/products')
      expect(response.status).toEqual(200)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body[getId(response)].id).not.toBeNull()
      expect(response.body[getId(response)].id).not.toBeUndefined()

      productId = response.body[getId(response)].id
    })

    it("Não deve retornar um produto inexistente", async() => {
      const response = await request(BASE_URL).get('/products/000')
      expect(response.status).toEqual(400)
      expect(response.body.name).toEqual("EntityNotFoundError")
      expect(response.body.message).toContain("Could not find any entity of type")
    })

    it('Deve retornar um produto válido', async() => {
      const response = await request(BASE_URL).get(`/products/${productId}`)

      const expectedProductBody = {
        "id": "",
        "title": "",
        "slug": "",
        "price": "",
        "description": "",
        "category": {
            "id": "",
            "name": "",
            "slug": "",
            "image": "",
            "creationAt": "",
            "updatedAt": ""
        },
        "images": [
            ""
        ],
        "creationAt": "",
        "updatedAt": ""
    }
      expect(response.status).toEqual(200)
      expect(Object.keys(response.body)).toEqual(Object.keys(expectedProductBody))
    })

    it('Deve retornar erro quando o id for passado como string', async() => {
      const response = await request(BASE_URL).get('/products/id-string')
      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual("Bad Request")
      expect(response.body.message).toEqual("Validation failed (numeric string is expected)")
    })

    it('Deve validar obrigatóriedade do campo price', async () => {
      const produto = newProduct()
      delete produto.price

      const response = await request(BASE_URL).post('/products')
                              .set('Accept', 'application/json')
                              .send(produto)
      expect(response.status).toEqual(400)
      expect(response.body.message).toEqual([
        "price should not be empty",
        "price must be a positive number"
      ])
    })
  })
})

