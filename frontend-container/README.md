# AppStack - React Admin & Dashboard Template

This project is using [Vite](https://vitejs.dev/) to compile and serve files.

## Prerequisites

You'll need to have Node.js installed, downloadable at [https://nodejs.org/](https://nodejs.org/). The required version can be found in the `/.nvmrc` file in the project root. You can also use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

## Quick Start

### Running the Application in Development Mode

#### Without Docker

1. **Install Dependencies**:
    ```sh
    npm install
    ```

2. **Start the Application**:
    ```sh
    npm run start:dev
    ```
    This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### With Docker

1. **Start the Application**:
    ```sh
    npm run uat:full
    ```
    This will build and start the application in a Docker container using the UAT configuration.

### Running the Application in Production Mode

#### Without Docker

1. **Install Dependencies**:
    ```sh
    npm install
    ```

2. **Start the Application**:
    ```sh
    npm run start:prod
    ```
    This will start the application in production mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### With Docker

1. **Start the Application**:
    ```sh
    npm run uat:prod
    ```
    This will build and start the application in a Docker container using the production configuration.

## Scripts Explanation

- **`npm run start:dev`**: Starts the application in development mode.
- **`npm run start:prod`**: Starts the application in production mode.
- **`npm run uat:full`**: Builds and starts the application in a Docker container using the UAT (User Acceptance Testing) environment.
- **`npm run uat:prod`**: Builds and starts the application in a Docker container using the production environment.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/).

To learn React, check out the [React documentation](https://reactjs.org/).