

## Description

Backend for Hospital Management System

## Installation

Install Yarn if you dont have it

```bash
npm i -g yarn
```

Then run

```bash
$ yarn
```
to install the dependencies


## Setup

First 
You need to setup the database or the project will NOT run

If you have docker installed run
```bash
docker-compose up
```
If you are not using docker then setup a PostgreSQL database and modify the .env file with your credentials

Once you setup the database run

```bash
npx prisma migrate dev
```
to migrate the db and generate the prisma client. This step is needed to start the app

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
