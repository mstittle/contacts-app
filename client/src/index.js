import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import rootReducer from './reducers'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.example.com/graphql' }),
    cache: new InMemoryCache()
  });

  
  ReactDOM.render(
    <ApolloProvider client={client}>
      <MyAppComponent />
    </ApolloProvider>,
    document.getElementById('root')
  )
  
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

    registerServiceWorker();
