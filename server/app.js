
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const DataSource = require('./datasource');

// create the schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

// Initialize express
const app = express();

const datasource = new DataSource();

// setup the GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: datasource }));

// and GraphiQL
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
