
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";

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

export default function CommentListGL() {
    const { loading, data, error } = useQuery(CONTACTS_QUERY);
    function renderLoading() {
        return (
        <div>
        Loading data...
        </div>
        );
    }

    if (error) {
      return <div>error</div>
    }
    return (loading ? renderLoading() : <ContactList contacts={data.contacts || []} />);
}

