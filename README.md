# CRUDs with different ORMs 

## Overview

There are two projects here. 
####express_orm_typescript
This project is about applying prisma ORM in mysql and mongoDB both(prismaController). Also you'll get to know about sequelize ORM(mainController) with typescript environment. 
####mongo
This project is about applying prisma and mongoose ORM in mongoDB both.

## Installation

1. Run the following commands
```
git clone https://github.com/mugdho37/orms_databases.git
cd orms_databases/express_orm_typescript
npm install
```
```
cd ../mongo
npm install
``` 
2.Get your database congiguration done
Link: https://github.com/mugdho37/db_connections/blob/main/README.md
3. I have kept database same for both projects

## express_orm_typescript
1. Run migration
    ```
    npx sequelize-cli db:migrate
    npx prisma migrate dev
    ```    
2. For mysql crud operation with prisma, you need to go prisma/schema.prisma file and **uncomment the mysql connection part** and **comment the mongo connection part** and run command each time you comment, uncomment the schema file 
    ```
    prisma generate
    ```
    and vice versa for CRUD operation on mongoDB

## mongo

 


