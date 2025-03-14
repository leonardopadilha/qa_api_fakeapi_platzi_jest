import request from 'supertest';
import { describe, expect, it } from '@jest/globals'
import getId from '../../functions/getId.js'

import 'dotenv/config'

const BASE_URL = process.env.BASE_URL

describe("#Auth", () => {
  it('Login não deve ser feito com sucesso devido request sem dados', async () => {
    const response = await request(BASE_URL).post('/auth/login')
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Unauthorized')
  })

  it('Login não deve ser feito com sucesso devido email incorreto', async () => {
    const response = await request(BASE_URL).post('/auth/login')
                              .set('Accept', 'application/json')
                              .send({ "email": "email@incorret.com", "password": "changeme" })
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Unauthorized')
  })
})