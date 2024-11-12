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

## 3. Frontend 

## 2. Frontend Testing
* End-to-end testing
* Contract testing
* Component testing