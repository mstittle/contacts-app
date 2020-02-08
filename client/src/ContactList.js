
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';

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

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.handleTimeout = this.handleTimeout.bind(this);
    this.state = {
      timedOut: false
    };
  }


  handleTimeout(timedOut, abortFn, timeVal) {
    this.setState({
      timedOut: timedOut ? true : false,
      cancel: abortFn ? abortFn : () => {},
      timeVal,
    });
  }

  renderLoading() {
    return (
    <div>
      Loading data...
    </div>)
  }

  renderError(error, refetch ) {
    return (
    <div>
      {`${error.message}`}
      <label>Data is taking a long time to load: {this.state.timeVal}</label>
        <button className="btn btn1" onClick={() => refetch()} >refetch</button>
    </div>)
  }

  renderTimedout() {
    return(
      <div>
        <label>Data is taking a long time to load: {this.state.timeVal}</label>
        <button className="btn btn1" onClick={this.state.cancel} >Cancel</button>
      </div>
      );
  }

  render() {
    return (
      <Query query={CONTACTS_QUERY}
      context={{ timeout: 300, retryCB: this.handleTimeout }} 
      >
      {({ loading, error, data, refetch }) => {
        if (this.state.timedOut)  {
          return this.renderTimedout(refetch )
        }
        if (loading) 
          return this.renderLoading();
        if (error) {
          return this.renderError(error, refetch )
        }
        return (
          <ContactList contacts={data.contacts} />
        );
      }}
      </Query>
    );
  }
}

const query = () => (
  <Query query={CONTACTS_QUERY}
  context={{ timeout: 30 }} 
  >
  {({ loading, error, data, refetch }) => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
      <ContactList contacts={data.contacts} />
    );
  }}
  </Query>
);

// export default query;