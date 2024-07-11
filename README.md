# NFLSTATS Development Environment
This is the NFLSTATS project, designed to provide statistical insights for the NFL.
## THIS APP NEEDS A TON OF WORK 
## 1. PIPELINES FROM SPORTS RADAR APIS FOR LIVE DATA 
## 2. OTHER ADVANCED ANALYTICS DATASOURCES FOR ADDTIONAL ANALYSIS FOR AN AI MODEL
## 3. DATA VISUALIZATION/DISPLAY
## 4. ADDING OTHER SPORTS
## 5. MAKING AI MODELS FOR SPECIFIC GAMES AND THEIR CONFIDENCE INTERVALS IN A PARTICULAR BET
This guide will help you set up the environment using GitHub Codespaces or set it up locally using Docker and Docker Compose. Be aware the application is half built right now. It needs quite a bit of TLC. This is my first project, feel free to criticize and make recommendations as you see fit!

NFLSTATS Development Environment Setup Guide
Welcome to the NFLSTATS project! This guide will walk you through setting up your development environment to run the application locally. Before diving into the setup process, ensure you have the following prerequisites installed on your machine:

Prerequisites
- Git: For cloning the repository. Download and install from Git's official site.
- Docker: Required for running the application's containers. Download and install Docker from Docker's official site.
- Docker Compose: For managing multi-container Docker applications. Typically included with Docker Desktop installations.
- Node.js: The runtime environment for the application. Download and install from Node.js's official site.
- npm: Comes with Node.js and is used for managing dependencies.
- Visual Studio Code (Optional): Recommended IDE for editing and debugging the application. Download from Visual Studio Code's official site.

Environment Setup
Clone the Repository
First, clone the NFLSTATS repository to your local machine using Git:

Replace [your_username] with your GitHub username if you have forked the repository. Otherwise, use the project's main repository URL.

Docker Environment
Ensure Docker and Docker Compose are installed and running on your machine. The application uses Docker containers for both development (docker-compose.debug.yml) and production (docker-compose.prod.yml) environments.

Node.js and npm Packages
After cloning the repository, navigate to the project directory and install the required npm packages:

This command installs all dependencies defined in package.json.

Environment Variables
The application requires several environment variables to be set. These variables can be found and modified in the .env files located in the project root or specific directories for different environments (e.g., .env.development, .env.production). Ensure all necessary variables are set before proceeding.

Running the Application for Development
With all prerequisites installed and environment variables set, you can start the development server using npm scripts defined in package.json:

This command executes the start:dev script, which builds the application for development and starts the development server. If everything is set up correctly, the application should now be running and accessible.

Accessing the Application
Once the application is running, you can access it by navigating to http://localhost:3000 in your web browser, assuming the default port configuration.

Additional Information
Dockerfiles: If the Dockerfiles are on .dockerignore, ensure to remove them from the ignore list or manually copy them into your project directory. The Dockerfiles are crucial for building the Docker images for both development and production environments.

Scripts: For detailed information on available npm scripts and their purposes, refer to the scripts section in package.json. These scripts provide shortcuts for common tasks such as building the application, starting the development server, and cleaning the build directory.

Contributing: Contributions to the NFLSTATS project are welcome! Please refer to the project's CONTRIBUTING.md file for guidelines on how to contribute.

By following this guide, you should now have a fully functional development environment for the NFLSTATS project. Happy coding!