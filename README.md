# Workshop full stack testing with JavaScript
* Frontend (Web application)
  * ReactJS
* Backend (REST API)
  * NodeJS
  * PostgreSQL

## 1. Backend
* NodeJS
* TypeScript
```
$npm install
$npm run build
```

## 2. Backend Testing
* End-to-end testing
* Integration testing
* Contract testing

## Start postgres database
* [Download and install](https://www.postgresql.org/download/)

Or working with Docker
```
$docker compose up -d postgres
$docker compose ps
```

### End-to-End testing with Postman
* Using [newman](https://www.npmjs.com/package/newman)
```
$cd postman
$newman run
```

### End-to-End testing with supertest and vitest
```
$cd backend
$export DATABASE_URL=postgresql://test:test@localhost:5432/test
$npm run prisma
$npm run seed

$npm run build 

$export JWT_SECRET=1234
$npm start
```
Access in web browser
* http://localhost:5000

Run test
```
$export API_URL=http://localhost:5000
$npm run test:e2e
```

### Integration test with supertest and vitest
* Connect to database with [Test container](https://testcontainers.com/)
  * [PostgreSQL](https://testcontainers.com/modules/postgresql/?language=nodejs)
```
// Run test
$export DATABASE_URL=postgresql://test:test@localhost:15432/test
$npm run test:integration

// Run test with coverage
$npm run test:integration:coverage
```

### Component/Isolated test with supertest and vitest
* Connect to mock database or [test double](http://xunitpatterns.com/Test%20Double.html)
```
// Run test
$npm run test:component

// Run test with coverage
$npm run test:component:coverage
```

### Contract testing with [Pact](https://docs.pact.io/)
* Provider

Start server and database before run test
```
$npm run test:contract
```

## 3. Frontend 
* ReactJS
```
$cd frontend
$npm install
$npm run build

$export REACT_APP_API_BASE_URL=http://localhost:5000/api/
$npm start
```
Access in web browser
* http://localhost:3000

## 4. Frontend Testing
* Unit testing
* Contract testing
* End-to-end testing

### Unit testing
```
$npm test
$npm run test:coverage
```

### Contract testing with [Pact](https://docs.pact.io/)
* Consumer = frontend
* Provider = backend

Contract tests in folder `contract-tests`\
* consumer.pact.spec.ts

```
$export CONTRACT_TEST_AUTH_TOKEN=<your token>
$npm run test:contract
```

Result :
* Create contract file in folder `pacts/`

### End-to-End testing with [Playwright](https://playwright.dev/)
* Start backend (nodejs + postgresql)

```
$cd playwright
$npm install
```

Run test
```
$export URL=http://localhost:3000
$npm test
$npm run test:all
$npm run test:production
```

## 5. Working with Docker
```
$docker compose build

$export REACT_APP_API_BASE_URL=http://localhost:5000/api/
$export JWT_SECRET=1234
$docker compose up -d
$docker compose ps
```

Access in web browser
* http://localhost:3000
