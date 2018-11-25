
const express = require('express');
const cors = require('cors')
//const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
//const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const DataSource = require('./datasource');

// create the schema
//const schema = makeExecutableSchema({
  //  typeDefs,
//    resolvers,
//  })

const datasource = new DataSource();
const server = new ApolloServer({ typeDefs, resolvers, context: datasource });

// Initialize express
const app = express();

app.use(cors());
server.applyMiddleware({ app });


// setup the GraphQL endpoint
//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: datasource }));

// and GraphiQL
//app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// start the server
//app.listen(3001, () => {
//  console.log('Go to http://localhost:3001/graphiql to run queries!');
//});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);