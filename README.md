# CRUDs with different ORMs 

## Overview

There are two projects here. 
####express_orm_typescript
This project is about applying prisma ORM in mysql and mongoDB both(prismaController). Also you'll get to know about sequelize ORM(mainController) with typescript environment. 
####mongo
This project is about applying prisma and mongoose ORM in mongoDB.

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
npx prisma generate
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
1. Go to the **mongo** directory
2. Run command 
    ```
    nodemon app.js
    ```
3. For using with mongoose you need to comment **app.use(foodRouterPrisma)** and uncomment    **app.use(foodRouter)** in the **app.js** file.
   ```
    const express = require("express");
    const mongoose = require("mongoose");
    const foodRouter = require("./database/orms/mongo/mongoose/routes/foodRoutes.js");
    const foodRouterPrisma = require("./database/orms/mongo/prisma_orm/routes/foodRoutePrisma.js");


    const app = express();

    app.use(express.json());
    // mongoose atlas connection
    // mongoose.connect(
    //   "mongodb+srv://test_database:12345@cluster0.hnrn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    // );

    //mongoose local connection
    mongoose.connect('mongodb://localhost:27017/myFirstDatabase')
        .then(() => {
            console.log('successfully connected to database');
        }).catch(err => console.log(err));

    app.use(foodRouter);
    //app.use(foodRouterPrisma)

    app.listen(3000, () => {
    console.log("Server is running...");
    });

   ```
4. For using with primsa you need to comment **app.use(foodRouter)** and uncomment **app.use(foodRouterPrisma)** in the **app.js** file.
***For using prisma with mongodb please use **mongodb atlas**, local mongoDB may show some error regarding **replica set** 
5. Postman URls
   ## You may get some ignorable difference between mongoose and Prisma ORM responses
   
    1. method: **POST** url: http://localhost:3000/category
    content-type: **application/JSON**
   **body**
  
        ```
            {
            "name": "Nachos",
            "serial": 1
            }
        ```

    1.  method: **GET** url: http://localhost:3000/category
    content-type: **application/JSON**
   **Response**
  
        ```
           [
                {
                    "_id": "627b4e00b21c257d9cded52a",
                    "serial": 1,
                    "name": "Solid",
                    "__v": 0,
                    "foods": [
                        {
                            "_id": "627ca7617aabff7909a38a16",
                            "name": "sandwitch",
                            "calories": 300,
                            "category": "627b4e00b21c257d9cded52a",
                            "__v": 0
                        },
                        {
                            "_id": "627ca78d7aabff7909a38a19",
                            "name": "soup",
                            "calories": 300,
                            "category": "627b4e00b21c257d9cded52a",
                            "__v": 0
                        }
                    ]
                },
            ]
        ```
     3. method: **POST** url: http://localhost:3000/food
    content-type: **application/JSON**
   **body**
  
        ```
            {
            "name": "Nachos",
            "calories": 500,
            "categoryId": "627a2db305cfc41a78e7795b" //you need to create category first and put the id here
            }
        ```
    4. method: **GET** url: http://localhost:3000/food/627ca7617aabff7909a38a16
    content-type: **application/JSON**
   **body**
        ```
        {
            "_id": "627ca7617aabff7909a38a16",
            "name": "sandwitch",
            "calories": 300,
            "category": {
                "_id": "627b4e00b21c257d9cded52a",
                "serial": 1,
                "name": "Solid",
                "__v": 0,
                "foods": [
                    "627ca7617aabff7909a38a16",
                    "627ca78d7aabff7909a38a19"
                ]
            },
            "__v": 0
        }
        ```
    4. method: **GET** url: http://localhost:3000/foods
    content-type: **application/JSON**
   **Response**
        ```
        [
            {
                "_id": "627b4c9db21c257d9cded527",
                "name": "thai soup",
                "calories": 101,
                "__v": 0
            },
        
            {
                "_id": "627c9b28454d9e91e78e0a8b",
                "name": "noodles",
                "calories": 200,
                "category": {
                    "_id": "627b4e00b21c257d9cded52a",
                    "serial": 1,
                    "name": "Solid",
                    "__v": 0,
                    "foods": [
                        "627ca7617aabff7909a38a16",
                        "627ca78d7aabff7909a38a19"
                    ]
                },
                "__v": 0
            },
        ]
        ```
    5. method: **PATCH** url: http://localhost:3000/food/627b4c9db21c257d9cded527
    content-type: **application/JSON**
   **body**
        ```
        {
            "name": "Noodles has been updated",
            "calories": 100,
            "categoryId": "627a2db305cfc41a78e7795b"
        }
        ```
        **Response**
        ```
        {
            "_id": "627b4c9db21c257d9cded527",
            "name": "noodles has been updated",
            "calories": 100,
            "__v": 0
        }
        ```
    6. method: **DELETE** url: http://localhost:3000/food/627c818496862a1863c7b4ee
    content-type: **application/JSON**
    **Response**
        ```
        {
        "message": "Food Item deleted successfuly",
        "DeletedItem": {
            "_id": "627c818496862a1863c7b4ee",
            "name": "thai soup updated 2",
            "calories": 101,
            "__v": 0
            }
        }
        ```



 


