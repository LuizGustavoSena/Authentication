# JWT Authentication

<div align="center">
<img height="400" src="assets/authentication.png" />
</div>
</br>
It's a simple API for create users and authenticate them with JWT.

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
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
    <img height="40" width="50" src="https://raw.githubusercontent.com/fastify/graphics/refs/heads/master/fastify-1000px-square-01.png" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" />
    <img height="40" width="50"src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
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
4. Start MongoDB:
   ```bash
   docker-compose up --build
   ```

---

## Usage

### Run the Development Server
```bash
npm start
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

## API Documentation

### Auth
- Endpoint: `POST /create_account`
  - Description: Create account
  - Body parameters: `username: string; email: string; password: string;`
  - Error handling: Create a user with an existing email
- Endpoint: `POST /login_account`
  - Description: Login account
  - Body parameters: `email: string; password: string;`
### Token
- Endpoint: `GET /validate_token`
  - Description: Validate token
  - Error handling: Create a account with an existing name
  - Body parameters: `name: string;`

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