const express = require('express');
const { handleRouteErrors } = require('./error');
const connectToMongo = require('./config/database');
const userRouter = require('./routes/user-route')
const authRouter = require('./routes/auth-routes');
const chatRouter = require("./socket/chat-route");


const app = express();

const port = process.env.PORT || 3000;

//for connecting to users database
connectToMongo()

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/', [userRouter, authRouter, chatRouter]);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('GlobalError', err);
  handleRouteErrors(err, req, res, next);
});

// Not Found Handler
app.use('*', (_req, res) => {
  res.status(404).json({
    status: 'Not Found',
    message: "This route doesn't exists!",
  });
});


module.exports = app;
