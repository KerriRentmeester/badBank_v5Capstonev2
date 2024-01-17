// server-side script using Node.js and Express: defines Express server that handles HTTP req & interacts with MongoDB
// handles back end logic: user acct creation, login, db operations
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import dal from './dal.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
//import dal from '../dal.js';
//import admin from '../admin.js';

const { create, findOne, find, update, all } = dal;
const app = express();

// Define Swagger options (replace this with your actual Swagger options)
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'BadBank Capstone API Documentation',
        version: '1.0.0',
        description: 'API connects to MongoDB for bank accounts/users',
      },
      basePath: '/',
    },
    apis: ['index.js'],
  };

// Initialize Swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(swaggerOptions);  // Swagger documentation says to write it this way
//const swaggerDocs = swaggerJSDoc(swaggerOptions);  // 25.4 vid wrote it  this way

// Serve Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// use middleware to serve static files from public directory
app.use(express.static('public'));
// use CORS middleware to enable cross-origin req
app.use(cors());  // more middleware

app.get("/", function (req, res) {
    res.send("hello");
});

/**
* @swagger
* /account/create/{name}/{email}/{password}:
*   get:
*       summary: Create a user account
*       description: Endpoint for creating a new user account.
*       parameters:
*           - in: path
*               name: name
*               description: User's name
*               required: true
*               schema:
*                   type: string
*           - in: path
*               name: email
*               description: User's email address
*               required: true
*               schema:
*                   type: string
*           - in: path
*               name: password
*               description: User's password
*               required: true
*               schema:
*                   type: string
*       responses:
*           '200':
*               description: User account created successfully
*           '400':
*               description: User already exists with the provided email
*           '500':
*               description: Internal server error
*
*/
// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // check if account exists
    dal.find(req.params.email).
        then((users) => {
            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);
                    });
            }
        });
});

/**
* @swagger
* /account/login/{email}/{password}:
*   get:
*       summary: Login a user to his/her account
*       description: Endpoint for logging in a user.
*       parameters:
*           - in: path
*               name: email
*               description: User's email address
*               required: true
*               schema:
*                   type: string
*           - in: path
*               name: password
*               description: User's password
*               required: true
*               schema:
*                   type: string
*       responses:
*           '200':
*               description: User logged in successfully
*           '400':
*               description: Incorrect password or user not found
*           '500':
*               description: Internal server error
*
*/
// login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            // if user exists, check password
            if(user.length > 0) {
                if (user[0].password === req.params.password) {
                    res.send(user[0]);
                    // res.status(200).send(user[0]);
                }
                else {
                    res.send('Login failed: wrong password');
                    // res.status(400).send('Login failed: wrong password');
                }
            }
            else {
                res.send('Login failed: user not found');
                // res.status(400).send('Login failed: user not found');
            }
        })
        .catch((error) => {
            console.error('Error during login:', error);
            res.status(500).send('Internal server error');
        });
});

/**
* @swagger
* /account/findOne/{email}:
*   get:
*       summary: Find a user account by email address
*       description: Obtain user account info based on the email address submitted
*       parameters:
*           - in: path
*               name: email
*               description: User's email address
*               required: true
*               schema:
*                   type: string
*       responses:
*           '200':
*               description: User account found successfully
*           '400':
*               description: User not found
*           '500':
*               description: Internal server error
*
*/
// find user account by email
// 'find one' will return the first email match it finds
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            if (!user) {
                res.send('Error: User not found');
                return;
            }
            console.log(user);
            res.send(user);
        })
        .catch((error) => {
            console.error(error);
            res.send('Error: Internal server error');
        });
});

/**
* @swagger
* /account/update/{email}/{amount}:
*   get:
*       summary: Update account balance
*       description: Update account balance based on deposits & withdrawals
*       responses:
*           '200':
*               description: Account balance updated successfully
*           '500':
*               description: Internal server error
*
*/
// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((error) => {
            console.error(error);
            res.send('Error: Internal server error');
        });
});

/**
* @swagger
* /account/all:
*   get:
*       summary: Retrieve all user accounts
*       description: Obtain a list of all user accounts with data
*       responses:
*           '200':
*               description: Retrieved all user accounts successfully
*           '500':
*               description: Internal server error
*
*/
// all accounts
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
        .catch((error) => {
            console.error(error);
            res.send('Error: Internal server error');
        });
});

//const port = 3000;
const port = process.env.PORT || 3000;  // this is the way Heroku likes this coded.
app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
