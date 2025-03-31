
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import typeDefs and resolvers
const userPostTypeDefs = require('./typeDefs/userPost-typeDefs');
const userPostResolvers = require('./resolvers/userPost-resolvers');

// Function to set up Apollo Server
async function setupGraphQLServer(app) {
  const server = new ApolloServer({
    typeDefs: userPostTypeDefs,
    resolvers: userPostResolvers,
  });

  await server.start();

  // Apply middleware to `/graphql`
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));
}

module.exports = setupGraphQLServer;