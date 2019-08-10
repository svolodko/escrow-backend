# Escrowescrow REST API Server

## Getting Started

### System Requirements

-   Node.js **8+**
-   MySql **5.7**

### Installing
- Clone the project from github.
- Install dependencies:
    ```bash
    cd escrowescrow
    npm install
    npm update
    ```
- Setting up environments
    - You should place SSL certificate for your domain to certificate folder of your app.
        For develop mode you can generate a self-signed certificate by next command:
        ```bash
        openssl req -nodes -new -x509 -keyout server.key -out server.cert
        ```
    - Create /config/config.json from /config/config.example.json and fill it.
- Run db migrate.
    ```bash
        npm run db-migrate
    ```
- Run the server.

    Development mode:
    ```bash
        npm run start-dev
    ```
    Production mode:
    ```bash
        npm start
    ```
- Run tests
    ```bash
        npm run test
    ```
- Run Linter
    ```bash
        npm run eslint
    ```
### Access to Api Documentation
    You can get access to api documantation by link https://{config.swagger.baseName}:{config.apiPort}/api-docs