const { ApolloServer, PubSub  } = require('apollo-server');
const typeDefs = require('./gql/typeDefs')
const resolvers = require('./gql/resolvers')
const pubsub = new PubSub();
// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.


// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.


// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers, pubsub });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});