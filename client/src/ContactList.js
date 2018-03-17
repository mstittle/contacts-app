
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { import { compose, graphql } from 'react-apollo'
}

const CONTACTS_QUERY = gql`
query {
    contacts {
        id,
        lastName,
        firstName,
        email
    }
}`;

export default class ContactList extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <Contact />
        
      </div>
    )
  }
}

export default graphql(CONTACTS_QUERY)(ContactList)