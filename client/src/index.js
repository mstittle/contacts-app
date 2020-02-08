import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import { onError } from "apollo-link-error";
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import './index.css';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import App from './App'


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);
  var t0 = performance.now();
  return forward(operation).map((data) => {
    var t1 = performance.now();
    console.log(`ending request for ${operation.operationName} ${t1-t0}`);
    return data;
  })
})

class OperationCountLink extends ApolloLink {
  constructor() {
    super();
    this.operations = 0;
  }
  request(operation, forward) {
    this.operations++
    console.log(`${operation.operationName} - id:${operation.variables.id || ''} - count: ${this.operations}`);
    return forward(operation);
  }
}

const link = ApolloLink.from([
  apolloLogger,
  new OperationCountLink(),
  consoleLink,
  errorLink,

  new HttpLink({ uri: 'http://localhost:4000/graphql' })
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>
  </BrowserRouter>
  ,
    document.getElementById('root'));

registerServiceWorker();
