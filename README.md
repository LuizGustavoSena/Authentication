# JWT Authentication

<div align="center">
<img height="400" src="assets/authentication.png" />
</div>
</br>
This project is a RESTful API built to handle user creation and authentication using JWT (JSON Web Tokens).

The application was developed with a focus on scalability, validation, testing, and containerization, using modern technologies and best practices.

## Table of Contents

- [Stack](#Stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contributor](#contributor)

---

## Stack
<div style="display: inline_block">
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" title="Typescript" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" title="Node" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg" title="Fastify"/>
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/knexjs/knexjs-original.svg" title="Knex" />
    <img height="40" width="50"src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" title="Postgress" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" title="Vitest" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" title="Docker" />
</div>

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LuizGustavoSena/Authentication.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Authentication
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start Postgress:
   ```bash
   docker compose up -d
   ```
4. Run migrations:
   ```bash
   npm run knex:latest:dev
   ```

---

## Usage

### Run the Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```
---
## API Endpoints
---
### Authentication

#### ➤ POST `/create_account`
Creates a new user account.
##### Request Body
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
#### ➤ POST `/login_account`
Login account.
##### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

### Token Validation

#### ➤ GET `/validate_token`
Validate token.
##### Request Headers
```json
{
  "authorization": "Bearer {token}"
}
```
---
## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add a meaningful message'
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## Contributor

<a href="https://github.com/LuizGustavoSena">
  <img height="60" width="60" style="border-radius: 50px" src="https://avatars.githubusercontent.com/u/69394005?v=4" alt="contrib.rocks image" />
</a>