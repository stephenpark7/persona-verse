FROM node:22

RUN apt-get update -qq && \
    apt-get install -y curl postgresql-client

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh | bash - && \
    bash -E nodesource_setup.sh && \
    apt-get install -y nodejs

WORKDIR /app/server

COPY server/package.json server/package-lock.json .

RUN npm install --prefix .

COPY server .

WORKDIR /app/client

COPY client/package.json client/package-lock.json .

COPY client .

RUN npm install --prefix .

WORKDIR /app

RUN npm install

EXPOSE 3000 3001
