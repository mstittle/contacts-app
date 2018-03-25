import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'

const CONTACT_QUERY = gql`
query getContact($id: ID!) {
    contact(id: $id) {
        id
        lastName
        firstName
        email
        phone
    }
}`;

const ContactDetail = ({firstName, lastName, email, phone}) => {
  return (
    <div>
      {firstName} {lastName}
      <ul>
        <li>{email}</li>
        <li>{phone}</li>
      </ul>
    </div>
  )
}

class Contact extends Component {
  render() {
    console.log(this);
    const {firstName, lastName, email, phone} = this.props.contact;
    return <ContactDetail firstName={firstName} lastName={lastName} email={email} phone={phone} />
  }
}

const query = ({match}) => (
  <Query query={CONTACT_QUERY} variables={{id: match.params.id}} >
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return <Contact {...data}/>
    }
    }
  </Query>
);

export default query;





