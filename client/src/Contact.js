import React from 'react'
import PropTypes from 'prop-types'

const Contact = ({firstName, lastName, email, phone) => {
  return (
    <div>
      {firstName} {lastName}
    </div>
  )
}

export default Contact;
