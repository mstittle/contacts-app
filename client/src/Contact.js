import React from 'react'

const Contact = ({firstName, lastName, email, phone}) => {
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

export default Contact;
