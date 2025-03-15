# Automação baseada na API Platzi

Automação de teste Web utilizando Jest

## Tecnologias Utilizadas

[![NODE](https://img.shields.io/badge/License-node-green.svg)](https://nodejs.org/en)
[![Jest](https://img.shields.io/badge/license-jest-red.svg)](https://jestjs.io/)
[![Postman](https://img.shields.io/badge/license-postman-red.svg)](https://www.postman.com/)
[![Newman](https://img.shields.io/badge/license-newman-red.svg)](https://www.npmjs.com/package/newman)
[![Faker](https://img.shields.io/badge/license-faker-green.svg)](https://fakerjs.dev/)
[![Jest-Stare](https://img.shields.io/badge/license-jestStare-green.svg)](https://www.npmjs.com/package/jest-stare)
[![Serve](https://img.shields.io/badge/license-serve-blue.svg)](https://www.npmjs.com/package/serve)
[![JS](https://img.shields.io/badge/license-javascript-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Descrição do Projeto

Este projeto envolve a automação de processos utilizando a [API Platzi](https://www.platzi.com), que é uma API fake de um E-commerce.


## Instalação

Instalar as dependências

```bash
  npm install
```

## Execução dos testes via terminal

```bash
  npm run test
```

## Executa os testes do Newman e gera um relatório newman_report.html no diretório onde o comando é executado

```bash
  newman run postman_collection.json -e postman_environment.json --reporters html,cli --reporter-html-export newman_report.html
```

## Para executar o relatório

```bash
  ng serve results
```