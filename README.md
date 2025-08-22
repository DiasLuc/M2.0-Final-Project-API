
# Spaced-Review Study Planner API

## Overview

This project is a RESTful API for scheduling and tracking study topic reviews using the Ebbinghaus forgetting curve. It helps users plan, add, and manage study topics and their review schedules.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for Node.js.
- **Mocha**: Test framework for unit and integration tests.
- **Chai**: Assertion library for testing.
- **Supertest**: HTTP assertions for API testing.
- **k6**: Performance and load testing tool.
- **Swagger**: API documentation (see `src/swagger.js`).
- **JSON**: Data storage for topics and test fixtures.

## Features

- Add, list, and view study topics.
- Schedule reviews based on spaced repetition.
- Mark reviews as completed, missed, or reschedule them.
- View daily review schedule.

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

```bash
git clone https://github.com/DiasLuc/M2.0-Final-Project-API.git
cd M2.0-Final-Project-API
npm install
```

### Running the API

```bash
npm run start
```

The API will be available at `http://localhost:3000`.

### API Documentation

See `src/swagger.js` for OpenAPI documentation. You can use Swagger UI or similar tools to visualize and interact with the API.

## Testing

### Unit & Integration Tests

Tests are written using Mocha, Chai, and Supertest.

```bash
npm test
```

### Performance Testing

Performance tests are written using k6. See the `test/performance/` directory.

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/performance/topics.test.js
```

## Project Structure

```
src/
   app.js
   data.js
   seed.js
   swagger.js
   utils.js
test/
   topics.test.js
   fixtures/
      postTopics.json
   helpers/
      common.js
   performance/
      topics.test.js
      config/
         config.local.json
      utils/
         variables.js
```
