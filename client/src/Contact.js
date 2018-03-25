import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

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
    if (this.props.data.loading) {
      return <div>loading data</div>
    }
    const {firstName, lastName, email, phone} = this.props.data.contact;
    return <ContactDetail firstName={firstName} lastName={lastName} email={email} phone={phone} />
  }
}


export default graphql(CONTACT_QUERY, {
  options: ({ match }) => ({
     variables: { id: match.params.id || '1' } }),
  //   variables: { id: '1' } }),
//  props: ({data}) => ({
//    data
//  })
})(Contact);