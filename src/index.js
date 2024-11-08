const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

// Create the server
const server = serverlessExpress({app});

// Lambda handler
exports.handler = async(event, context) => {
  return server(event, context);
};
