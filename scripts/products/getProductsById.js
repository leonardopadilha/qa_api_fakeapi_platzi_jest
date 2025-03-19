import { check } from 'k6'
import http from 'k6/http'

const BASE_URL = "https://api.escuelajs.co/api/v1"

const getId = (arr) => {
  return Math.floor(Math.random() * arr.length)
}

export default function() {
  const products = http.get(`${BASE_URL}/products`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const body = products.json()
  const id = JSON.stringify(body[getId(body)].id)
  const product = http.get(`${BASE_URL}/products/${id}`)

  check(product, {
    'status 200': (r) => r.status === 200
  })
}