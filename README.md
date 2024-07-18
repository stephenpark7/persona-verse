# Twitter Clone

This monorepo contains a Twitter clone application built using modern web technologies. The project demonstrates a full-stack implementation with a focus on a scalable and maintainable architecture.

## Tech Stack

- Front-end: React, TypeScript, Webpack, Babel
- Back-end: Node.js, Express.js, Sequelize
- Database: PostgreSQL
- Testing: Jest
- Linting: ESLint, Stylelint
- Containerization: Docker

## Setup Instructions

1. **Update Environment Variables**: \
Modify the .env file in the server folder to match your database configuration.

2. **Install Dependencies**: \
From the root directory, install dependencies for both client and server: \
`npm run install`

3. **Run Application**: \
Start the server: \
`npm run server` \
Start the client: \
`npm run client`

4. **Docker Setup**: \
Build the Docker image and run it in detached mode: \
`npm run docker-start` \
Stop Docker containers: \
`npm run docker-stop` \
Restart Docker containers: \
`npm run docker-restart`
