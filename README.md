User Management API
This project implements a RESTful API for user management using Express, MongoDB, TypeScript, and Node.js. It allows for creating, reading, updating, and deleting user information in a database.

## Project Structure
src
-config //contain dev and prod configs 
-database // contains the mongodb setup
-middleware // contains the authorization setup using jwt token
-pkt // contains typescript interface
-test // contains Unit tests for API endpoints and you can run the test using npm run test
-type // contains the express types for the user , which i use it in the auth
-user 
 -user.controller //Controllers for handling HTTP requests.
 -user.service //Business logic for user management.
 -user.route // API routes definitions.
 -user.model // user schema 
-utils // use to hold utility function in the application
config.worker.ts: Configuration for development environment.


## Getting Started
To set up and run the project, follow these steps:

Clone this repository:
git clone https://github.com/coletking/take-home-assessment-Bizpend.git
Install dependencies:
npm install : using npm run dev
Run the project:
For development config: using npm run dev
For production config: npm run prod

Access the API documentation:
You can view the API documentation using this link https://documenter.getpostman.com/view/12651965/2sA3JT1cmM

Testing
To run the unit tests, execute: npm run test

Additional Notes
Environment setup: Separate configurations for staging and production environments are provided in the config folder.
Development: Development environment configurations are in config.worker.ts.

## How to get Token

Please note that to obtain the Bear token, you'll need to create a user. The response will contain a token that you can utilize to make calls to the following endpoints: "Get User by ID," "Update User," and "Delete User."