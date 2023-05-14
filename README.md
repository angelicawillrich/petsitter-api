# PetSitter API

Este projeto é parte do TCC do curso de Engenharia de Software 2023 - UNIGRAN EAD.

## Informações inicias
O projeto foi desenvolvido em plataforma Ubuntu Linux 20.4.

As seguintes ferramentas e suas correspondendes versões foram utilizadas:
- Node v.18.16.0
- Npm 9.5.1
- Docker v.20.10.14
- Docker-compose v.1.29.2

Para o banco de dados NoSQL foi utilizado o MongoDB. Para fins de desenvolvimento e teste, não é necessário instalar o servidor Mongo, pois ele é executado em um container do Docker.

## Execução

1. Executar container do Docker **no diretório raiz do projeto**:
```bash
docker-compose up -d
```

2. Executar as migrations para criação das collections do banco de dados e populá-las com informações básicas para teste:
```bash
npm run migration
```

3. Executar o projeto
```bash
npm run start:dev
```

## Testes unitários
```bash
npm run test
```

