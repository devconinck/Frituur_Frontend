# Examenopdracht Front-end Web Development

- Student: Quinten Deconinck
- Studentennummer: 202293145
- E-mailadres: <mailto:quinten.deconinck@student.hogent.be>

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

## Testen

### To test the application, make sure your run the following command in the backend:

```bash
prisma db seed
```

### If you get an error here, make sure you have the correct .env file in the backend folder and run the following command in your Windows terminal:

```bash
npm install prisma -g
```

### Make sure both the frontend AND backend are running locally in your terminal by using the following commands:

```bash
FRONTEND: yarn dev
BACKEND: yarn start
```

### Then run the following command in a different terminal:

```bash
yarn test
```

You can now select E2E tests in the cypress window and select the tests you want to run.
