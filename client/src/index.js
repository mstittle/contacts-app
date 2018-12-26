import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom'
import apolloLogger from 'apollo-link-logger';
import ApolloLinkTimeout from 'apollo-link-timeout';
import rootReducer from './reducers'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);


const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);
  var t0 = performance.now();
  return forward(operation).map((data) => {
    var t1 = performance.now();
    console.log(`ending request for ${operation.operationName} ${t1-t0}`);
    return data;
  })
})

const timeoutLink = new ApolloLinkTimeout(10); // 10 second timeout


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
  timeoutLink,
  apolloLogger,
  new OperationCountLink(),
  consoleLink,
  new HttpLink({ uri: 'http://localhost:4000/graphql' })
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
