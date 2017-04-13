# Loopback Todo API

A sample REST API implemented with Loopback and with user data isolation.

## How to run

1. Start Postgres database container:
   
   ```
   ./start-database.sh
   ```

2. Create database tables:
   
   ```
   node bin/update-database.sh
   ```

3. Start API server:
   
   ```
   npm install
   npm start
   ```

4. Access API Swagger URL:
   
   ```
   http://localhost:3000/explorer/
   ```

## License
Licensed under Apache 2.0