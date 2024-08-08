FROM node:22

RUN apt-get update -qq && \
    apt-get install -y curl postgresql-client

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh | bash - && \
    bash -E nodesource_setup.sh && \
    apt-get install -y nodejs

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install --force
    
WORKDIR /app/server

COPY package.json ./

RUN npm install --force

COPY . .

EXPOSE 3001 3002
