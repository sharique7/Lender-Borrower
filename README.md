# laail-networks

## Problem Statement

<img width="517" alt="image" src="https://user-images.githubusercontent.com/63374020/209855150-cff3a276-7e3c-4bbb-bd07-56475ae6936f.png">


- Pre-requisites
  - Node.js
  - NPM
  - Git


## Description

- Clone the project
  ```bash
  git clone git@github.com:fellow-developers/assignment-laail-network.git
  ```

- Change directory to project
  ```bash
  cd assignment-laail-network
  ```

- Open project in VS Code
  ```bash
  code .
  ```

- Install dependencies
  ```bash
  npm install
  ```

- [Create mongodb database user]((https://www.mongodb.com/docs/manual/reference/method/db.createUser/#mongodb-method-db.createUser))

open terminal and run the following commands

- Open to mongo shell
  ```bash
  mongosh
  ```

- Change to admin database
  ```bash
  use admin
  ```

- Create user for laaildb database

  ```bash
  db.createUser({user: "developer", pwd: "password", roles: [{role: "dbAdmin", db: "laaildb" }]})
  ```

- Exit mongo shell
  ```bash
  exit
  ```

- Enable authorization in mongod configuration file (mongod.cfg)
  
  ```text
  security:
    authorization: enabled
  ```

- Restart mongodb service

  ```cmd
  net stop MongoDB && net start MongoDB
  ```

  Note- 
  - location of mongod.cfg file is different for different OS. For more details refer [here](https://docs.mongodb.com/manual/reference/configuration-options/#security-options)

  - [We can login to mongo shell with authentication](https://www.mongodb.com/community/forums/t/how-to-connect-using-user-id-and-password/8234)
    ```bash
    mongosh --authenticationDatabase 'admin' -u 'developer' -p 'password'
    ```

- Create .env file
  ```bash
  touch .env
  ```

- Add environment variables in .env file
  ```text
  # The port to listen on for HTTP requests.
  PORT=3000

  # Database
  DATABASE_URL=mongodb://localhost:27017
  DATABASE_NAME=laaildb
  DATABASE_USER=developer
  DATABASE_PASSWORD=password
  DATABASE_AUTH_SOURCE=admin
  ```

- Build project
  ```bash
  npm run build
  ```

- Run project
  ```bash
  npm start
  ```

- Open browser and go to http://localhost:3000



## API Documentation

- User
  
  - Create User (lender or borrower)
    
    - Endpoint: `POST /api/users`

    - Request Body:
      ```json
      {
        "name": "user name",
        "mobile": "1234567890",
        "type": "user-type"
      }
      ```

    - Response Body:
      ```json
      {
        "name": "user name",
        "mobile": "1234567890",
        "type": "user-type",
        "_id": "63b07d92d48b6edde9d02f5a",
        "__v": 0
      }
      ```

    - Note- type can be either "lender" or "borrower"

    - Curl Command to test:
      ```bash
      curl -X POST 'http://127.0.0.1:3000/api/users' \
      -H 'Content-Type: application/json' \
      -d '{
        "name": "user name",
        "mobile": "1234567890",
        "type": "lender"
      }' | json_pp
      ```

  - Get User (lender or borrower)
    
    - Endpoint: `GET /api/users/?type=user-type`

    - Response Body:
      ```json
      {
        results: [
          {
            "_id": "63b0437c0604d588afaa34bd",
            "name": "user name 1",
            "mobile": "1234567890",
            "type": "user-type",
            "__v": 0
          },
          {
            "_id": "63b07d92d48b6edde9d02f5a",
            "name": "user name 2",
            "mobile": "1234567899",
            "type": "user-type",
            "__v": 0
          }
        ]
      }
      ```

    - Curl Command to test:
      ```bash
      curl 'http://127.0.0.1:3000/api/users/?type=lender' | json_pp
      ```

    - Note- type can be either "lender" or "borrower"

- Contact

  - Create Contact
    
    - Endpoint: `POST /api/contacts`

    - Request Body:
      ```json
      {
        "lenderId": "63b043650604d588afaa34bb",
        "borrowerId": "63b0437c0604d588afaa34bd",
        "principle": 10000,
        "interest": 10
      }
      ```

    - Response Body:
      ```json
      {
        "lender": {
          "_id": "63b043650604d588afaa34bb",
          "name": "test user 1",
          "mobile": "1234567890",
          "type": "lender",
          "__v": 0
        },
        "borrower": {
          "_id": "63b0437c0604d588afaa34bd",
          "name": "test user 2",
          "mobile": "1234567890",
          "type": "borrower",
          "__v": 0
        },
        "principle": 10000,
        "interest": 10,
        "status": "active",
        "_id": "63b079ef377e5100fda0fa95",
        "createdAt": "2022-12-31T18:05:35.705Z",
        "__v": 0
      }
      ```

    - Curl Command to test:
      ```bash
      curl -X POST 'http://127.0.0.1:3000/api/contacts' \
      -H 'Content-Type: application/json' \
      -d '{
        "lenderId": "63b043650604d588afaa34bb",
        "borrowerId": "63b0437c0604d588afaa34bd",
        "principle": 10000,
        "interest": 10
      }' | json_pp
      ```

  - Get Lender Loan Amount
    
    - Endpoint: `GET /api/lender-loan-amount/:id`

    - Response Body:
      ```json
      {
        "results": [
          {
            "lenderName": "test user 1",
            "total": 110000
          },
          {
            "lenderName": "test user 4",
            "total": 200000
          }
        ]
      }
      ```

    - Curl Command to test:
      ```bash
      curl 'http://127.0.0.1:3000/api/lender-loan-amount/1' | json_pp
      ```

  - Get Lender Loan Count

    - Endpoint: `GET /api/lender-loan-count/:id`

    - Response Body:
      ```json
      {
        "results" : [
          {
            "lenderName" : "test user 4",
            "total" : 1
          },
          {
            "lenderName" : "test user 1",
            "total" : 2
          }
        ]
      }
      ```

    - Curl Command to test:
      ```bash
      curl 'http://127.0.0.1:3000/api/lender-loan-count/1' | json_pp
      ```
