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
// app.use('/', [userRouter, authRouter, chatRouter]);
//API Gateway might not route correctly unless these are explicitly set.
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('GlobalError', err);
  handleRouteErrors(err, req, res, next);
});

// Not Found Handler
// app.use('*', (_req, res) => {
//   res.status(404).json({
//     status: 'Not Found',
//     message: "This route doesn't exists!",
//   });
// });
//Added a simple route to verify the app is working
app.use('/', (_req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

module.exports = app;
