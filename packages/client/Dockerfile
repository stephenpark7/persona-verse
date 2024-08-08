FROM node:22

RUN apt-get update -qq && \
    apt-get install -y curl postgresql-client

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh | bash - && \
    bash -E nodesource_setup.sh && \
    apt-get install -y nodejs

WORKDIR /app/packages/client

COPY packages/client/package.json packages/client/tsconfig.json packages/client/tsconfig.app.json packages/client/tsconfig.node.json packages/client/eslint.config.js packages/client/jest.config.js ./

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install --force
    
WORKDIR /app/packages/client

RUN npm install --force

COPY packages/client .

EXPOSE 3000
    