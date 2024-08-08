FROM node:22

RUN apt-get update -qq && \
    apt-get install -y curl postgresql-client

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh | bash - && \
    bash -E nodesource_setup.sh && \
    apt-get install -y nodejs

WORKDIR /app/packages/client

COPY packages/client .

WORKDIR /app/packages/server

COPY packages/server .

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/packages/client

RUN npm install

WORKDIR /app/packages/server

RUN npm install

EXPOSE 3001 3002

CMD ["npm", "run", "dev"]
