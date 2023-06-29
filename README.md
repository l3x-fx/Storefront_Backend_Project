# Storefront Backend Project

## Project Overview
**In this project the following scenario was given**
>>The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.<<

## Setup Databases
To set up the workspace, follow these steps:
- create the postgres databases `store_dev`and `store_test`. 
- create the user `user_one` and grant access to all databases



## Ports
- `5432` as Database Port
- `3000` as Backend Port

## DOTENV
Usually the .env file should never be included in the repository. 
However to pass this project, I had to proved provide the environment variables, therefore the .env File is included 

## Postman Collection
To make testing easier for the reviewer, a Postman Collection is included in this repo.

## Scripts
- ``npm run migrateup`` to set up and fill all the tables
- ``npm run dbteardown`` to safely drop all tables
- ``npm run start`` to run the project
- ``npm run test``to run the tests

## Tech Stack 
- ``Postgres`` for the database
- ``Node/Express`` for the application logic
- ``dotenv`` from npm for managing environment variables
- ``db-migrate`` from npm for migrations
- ``jsonwebtoken`` from npm for working with JWTs
- ``jasmine and supertest`` from npm for testing

## Endpoints, Datashapes, and Tables
... can be find in the `REQUIREMENTS.md`


