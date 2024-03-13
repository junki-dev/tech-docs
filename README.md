Technical Documents Service - [API]
===

## Skills

- Node.js(TS)
- Nest.js
- MongoDB
- Jest
- Docker, docker-compose
- Git
- GitHub

## Requirements
- Node.js
- Yarn
- Docker
- docker-compose

## Installation

```bash
$ yarn install
```

## Running Applications
```bash
$ docker-compose up -d
```

## Stopping Applications
```bash
$ docker-compose down
```

## Tests
```bash
$ yarn test:e2e
```

## Commands
### generate ts file from proto
```bash
$ protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/docs.proto
```

## Docs
- [Project Description](https://www.notion.so/tech-docs-bab0d6f1b22e4328a7aae0e352f264a6?pvs=4)
- [Resume](https://fuschia-salt-be2.notion.site/Junki-Kim-4ba2fd1067e245d09b9b90f9db4dfba3?pvs=4)
