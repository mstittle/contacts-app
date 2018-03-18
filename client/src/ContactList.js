
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import Contact from './Contact';
import './ContactList.css';

const CONTACTS_QUERY = gql`
query {
    contacts {
        id
        lastName
        firstName
        email
        phone
    }
}`;

class ContactList extends Component {
  static propTypes = {
    constants: PropTypes.array,
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading data</div>
    }
    const contacts = this.props.data.contacts || [];

    const list = contacts.map((contact, index)=> (
      <Contact key={index} {...contact} />
    ))

    return (
      <div className="Contact-list">
        <h1>Contacts</h1>
        {list}
      </div>
    )
  }
}

export default graphql(CONTACTS_QUERY)(ContactList)