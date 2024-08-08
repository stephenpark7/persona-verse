FROM node:22

RUN apt-get update -qq && \
    apt-get install -y curl postgresql-client

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh | bash - && \
    bash -E nodesource_setup.sh && \
    apt-get install -y nodejs

WORKDIR /app/packages/server

COPY packages/server/package.json packages/server/tsconfig.json packages/server/babel.config.js packages/server/eslint.config.mjs packages/server/jest.config.js ./

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install --force
    
WORKDIR /app/packages/server

RUN npm install --force

COPY packages/server .

EXPOSE 3001 3002
