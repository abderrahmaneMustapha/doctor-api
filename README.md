# Doctor's Office Management System API

This API is designed for the efficient administration of a Doctor's Office, providing tools for managing patient appointments, medical records, prescriptions, and medical histories.

## Core Entities

- **Doctor**: Manages information such as name, email, password, and specialization.
- **Patient**: Stores details like name, email, password, date of birth, and address.
- **Prescription**: Records details about the medication prescribed by a doctor to a patient, including dosage, frequency, and duration.
- **Medical History**: Keeps a log of a patient's medical visits, diagnoses, treatments, and additional notes.

## Features

- **Patient Management**: Doctors and administrative staff can view and edit patient profiles.
- **Prescription Handling**: Doctors can issue, revise, and remove prescriptions, while patients can view their own prescriptions.
- **Medical History Tracking**: Doctors are enabled to document and modify medical histories, which are accessible to the corresponding patients.

## User Actions

- **Profile Creation**: Each user can register and manage their own profile.
- **Doctor Functions**: Doctors have the ability to manage prescriptions and medical histories and access patient data.
- **Administrative Staff Functions**: Administrative staff have viewing access to patient data.
- **Patient Functions**: Patients can access their own medical histories and prescriptions, and update their personal information.

## API Documentation

The API is documented with OpenAPI and showcased through Swagger UI, offering an interactive and comprehensive guide to the available endpoints, their required parameters, and the expected response structures.

### Accessing Documentation

To engage with the interactive API documentation:

1. Launch the API server locally.
2. Open your web browser and navigate to `http://localhost:3000/api`.
3. The Swagger UI will be displayed, allowing you to execute endpoint operations directly in the browser.

### Swagger UI Benefits

Using the Swagger UI, you can:

- Explore the full list of available endpoints.
- Execute test requests and examine the API responses.
- Investigate the request models and response schemas.

## Getting Started

Follow these steps to set up the project on your local machine for development and testing.

### Prerequisites

- Node.js version v16.19.0 or above (using nvm is advised).
- Git.
- Docker (for database containerization).
- Nest.js framework.

### Installation

Clone the repository:

```bash
git clone https://github.com/abderrahmaneMustapha/doctor-office-api.git
cd doctor-office-api
```

Install the project dependencies:

```bash
npm install
```

### Running with Docker

This project utilizes Docker to streamline the development environment and simplify deployment.

#### Database Setup with Docker

Create a `.env` file with the necessary environment variables:

```plaintext
NODE_ENV=development
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5433
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
TYPEORM_AUTO_LOAD_ENTITIES=true
POSTGRES_DB=dev-db
POSTGRES_USER=dev-user
POSTGRES_PASSWORD=test123
JWT_SECRET=testsecret
```

Launch the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

#### Running the Application

Start the application in development mode:

```bash
npm run start:dev
```
