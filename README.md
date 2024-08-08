# Twitter Clone

This monorepo contains a Twitter clone application built using modern web technologies. The project demonstrates a full-stack implementation with a focus on a scalable and maintainable architecture.

## Tech Stack

### Front-end

- **Framework:** React
- **Language:** TypeScript
- **State Management:** React Redux, RTK Query

### Back-end

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize
- **RPC:** tRPC
- **Database:** PostgreSQL

### Development

- **Building:** Vite
- **Testing:** Jest
- **Linting:** ESLint, Prettier
- **Containerization:** Docker

## Setup Instructions

1. **Update Environment Variables**:

   Modify the `.env` files in the `client` and `server` folders to match your configuration.

2. **Install Dependencies**:

   From the root directory, install dependencies for both client and server:

   ```sh
   npm install
   ```

3. **Run Application**:

   Start the server:

   ```sh
   npm run server
   ```

   Start the client:

   ```sh
   npm run client
   ```

4. **Docker Setup**:

    Alternatively, you can use Docker to run the app if you are having issues with local installation.

   ```sh
   docker-compose up -d
   ```

5. **TypeScript and Linting**

    To check for TypeScript errors and linting issues:

    ```sh
    tsc
    npm run lint
    ```
