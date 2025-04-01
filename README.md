<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Music Booking API

# Overview

The Music Booking API is a RESTful API designed to manage artist profiles, event listings, and booking transactions for a music event platform. Built with scalability, security, and usability in mind, it allows users to create accounts, browse events, and book tickets while artists can manage their profiles and events. The API is deployed on Render and includes comprehensive documentation via Swagger and Postman.

## Features

1. **Artist Management**:

   - Create and retrieve artist profiles.
   - Artists can log in to manage their events.

2. **Event Management**:

   - Create and list events tied to specific artists.
   - Retrieve event details for booking.

3. **Booking System**:

   - Users can book tickets for events.
   - Tracks booking status (pending, confirmed, cancelled).

4. **User Management**:

   - Non-artist users can register and log in to book events.
   - Distinct from artists for clear role separation.

5. **Authentication**:
   - JWT-based authentication for secure access to protected endpoints.
   - Supports both artist and user logins.

## Technology Stack

- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens) via `@nestjs/jwt` and `passport-jwt`
- **Validation**: `class-validator` and `class-transformer`
- **API Documentation**: Swagger (`@nestjs/swagger`)
- **Deployment**: Render
- **Version Control**: GitHub

---

## GitHub Repository

The source code is available at:  
[**GitHub Repo**](https://github.com/emmanuel-dcoder/MusicBookingApi)

---

## Project setup

```bash
$ npm install
```

---

## Base URL

The API is hosted at:  
**`https://musicbookingapi.onrender.com`**

---

## API Documentation

### Swagger Documentation

![Swagger](https://via.placeholder.com/50?text=Swagger)  
Explore the interactive Swagger UI for detailed endpoint descriptions, request/response schemas, and testing:  
[**Swagger Docs**](https://musicbookingapi.onrender.com/docs)

### Postman Documentation

![Postman](https://via.placeholder.com/50?text=Postman)  
Access the Postman collection for a comprehensive set of API requests with examples:  
[**Postman Docs**](https://documenter.getpostman.com/view/23195379/2sB2cRE5Jd)

## Endpoints

Below is a summary of the key endpoints. Refer to the Swagger or Postman documentation for full details.

| **Endpoint**    | **Method** | **Description**               | **Protected** |
| --------------- | ---------- | ----------------------------- | ------------- |
| `/auth/login`   | POST       | Authenticate a user or artist | No            |
| `/users`        | POST       | Create a new user             | No            |
| `/users`        | GET        | Get all users                 | No            |
| `/users/:id`    | GET        | Get a user by ID              | No            |
| `/artists`      | POST       | Create a new artist           | No            |
| `/artists`      | GET        | Get all artists               | No            |
| `/artists/:id`  | GET        | Get an artist by ID           | No            |
| `/events`       | POST       | Create a new event            | No            |
| `/events`       | GET        | Get all events                | No            |
| `/events/:id`   | GET        | Get an event by ID            | No            |
| `/bookings`     | POST       | Create a new booking          | Yes (JWT)     |
| `/bookings`     | GET        | Get all bookings              | Yes (JWT)     |
| `/bookings/:id` | GET        | Get a booking by ID           | Yes (JWT)     |

- **Protected Endpoints**: Require a Bearer token in the `Authorization` header, obtained from `/auth/login`.

---

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables in `.env`.
4. Start the server: `npm run dev` or `npm start`.

## Compile and run the project

```bash
# development
$ npm run start:dev

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
