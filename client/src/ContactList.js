
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query  } from 'react-apollo'
import { Link } from 'react-router-dom';
import './ContactList.css';

const CONTACTS_QUERY = gql`
query getContacts {
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
      <div key={index+1} className="Contact-list-contact">
      <Link to={`/contact/${contact.id}`} >{contact.firstName} {contact.lastName}</Link><br />
      <img src="https://png.icons8.com/color/50/000000/user.png" />
      </div>
    ))

    return (
      <div className="Contact-list">
        <h2>Contacts</h2>
        <div className="Contact-list-grid">
        {list}
        </div>
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