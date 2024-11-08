# Tribe API - Server Side

Welcome to the **Tribe API** server-side repository! This project is part of a social networking platform tailored for student travelers and travel enthusiasts. It enables users to connect, share travel experiences, find homestays, and join travel squads. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure login and registration using JWT and refresh tokens.
- **Microblogging**: Users can create posts, like, and comment on them.
- **Homestay Listings**: Users can search and list affordable homestays.
- **Travel Squads**: Form and join travel squads based on interests and locations.
- **Personalized Recommendations**: Get recommended homestays and squads using an ML-based engine.
- **Google Meet Integration**: Generate and share meeting links using Google Calendar API.

## Tech Stack

- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express**: Fast and minimalist web framework for Node.js.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for flexible data modeling.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: Secure token-based authentication.
- **GraphQL**: API query language for flexible and efficient data fetching.
- **AWS Lambda**: Serverless functions for backend deployment.
- **GraphQL**: For better API payload delivery.

## Project Structure

- **controllers/**: Define request handlers for various routes.
- **middleware/**: Contains authentication and error-handling middleware.
- **models/**: Mongoose schemas and models for MongoDB collections.
- **routes/**: API route definitions for different services.
- **services/**: Business logic and database interaction methods.
- **utils/**: Helper functions, including JWT token utilities.

### Prerequisites

- **Node.js** (v18+)
- **MongoDB Atlas Account**
- **AWS Account** (for Lambda deployment)
- **Google Cloud Account** (for Google Meet integration)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Tribe-api.git
   cd Tribe-api

2. **Run npm install**
3. **Run npm start**


