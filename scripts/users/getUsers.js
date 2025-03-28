import { check } from 'k6'
import http from 'k6/http'

const BASE_URL = "https://api.escuelajs.co/api/v1"

export default function() {
  const res = http.get(`${BASE_URL}/users`)

  check(res, {
    'status 200': (r) => r.status === 200,
    'array de usuarios nao esta vazio': (r) => r.body.length > 0
  })
}