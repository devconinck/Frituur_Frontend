# Examenopdracht Front-end Web Development

- Student: Quinten Deconinck

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Opstarten

### Install all dependencies using the following command:

```bash
yarn install
```

### Run the following command to start the application:

```bash
yarn dev
```

## To test the application, follow these steps:

### Make sure both the frontend AND backend are running locally in your terminal by using the following commands:

```bash
FRONTEND: yarn dev
BACKEND: yarn start:dev
```

#### Make sure the backend is correctly setup according to the README.md file in the backend folder.

### Then open a different terminal and run the following command:

```bash
yarn test
```

You can now select E2E tests in the cypress window and select the tests you want to run.

### If you made any changes to the database, make sure you run the following command in the backend:

```bash
prisma db seed
```

### If you get an error here, make sure you have the correct .env file in the backend folder and if necessary run the following command in your Windows terminal:

```bash
npm install prisma -g
```
