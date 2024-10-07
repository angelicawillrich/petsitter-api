# PetSitter API

This project is part of the final project for the Software Engineering 2023 course (UNIGRAN).

## Execution

1. Install dependencies

```bash
npm i
```

2. Run Docker container (but first, make sure the docker service is running):

```bash
docker-compose up -d
```

3. Run the migrations to create the database collections and populate them with basic information for testing:

```bash
npm run migration
```

Users created:

- PetSitter: email: 'johndoe@email.com', password: 'password'
- PetSitter: email: 'maria@email.com', password: 'password'
- Usuário: email: 'anamaria@email.com', password: 'password'

4. Run the project

```bash
npm run start:dev
```

## Unit tests

```bash
npm run test
```

### PT-BR

# PetSitter API

Este projeto é parte do TCC do curso de Engenharia de Software 2023 - UNIGRAN EAD.

## Informações inicias

O projeto foi desenvolvido em plataforma Ubuntu Linux 20.4.

O projeto usa o framework Express.

As seguintes ferramentas e suas correspondendes versões foram utilizadas:

- Node v.18.16.0
- Npm 9.5.1
- Docker v.20.10.14
- Docker-compose v.1.29.2

Para o banco de dados NoSQL foi utilizado o MongoDB. Para fins de desenvolvimento e teste, não é necessário instalar o servidor Mongo, pois ele é executado em um container do Docker.

## Execução

1. Instalar dependdências

```bash
npm i
```

2. Executar container do Docker **no diretório raiz do projeto** (mas, antes, certifique-se que o serviço docker esteja rodando no seu computador):

```bash
docker-compose up -d
```

3. Executar as migrations para criação das collections do banco de dados e populá-las com informações básicas para teste:

```bash
npm run migration
```

Usuários criados:

- PetSitter: email: 'johndoe@email.com', password: 'password'
- PetSitter: email: 'maria@email.com', password: 'password'
- Usuário: email: 'anamaria@email.com', password: 'password'

4. Executar o projeto

```bash
npm run start:dev
```

## Testes unitários

```bash
npm run test
```
