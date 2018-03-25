
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query  } from 'react-apollo'
import { Link } from 'react-router-dom';
import './ContactList.css';

const CONTACTS_QUERY = gql`
query {
    contacts {
        id
        lastName
        firstName
    }
}`;

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.array,
  }

  render() {
    const contacts = this.props.contacts || [];

    const list = contacts.map((contact, index)=> (
      <div key={index+1}>
      <Link to={`/contact/${contact.id}`} >{contact.firstName}{contact.lastName}</Link>
      </div>
    ))

    return (
      <div className="Contact-list">
        <h1>Contacts</h1>
        {list}
      </div>
    )
  }
}

const query = () => (
  <Query query={CONTACTS_QUERY}>
  {({ loading, error, data }) => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
      <ContactList contacts={data.contacts} />
    );
  }}
  </Query>
);

export default query;