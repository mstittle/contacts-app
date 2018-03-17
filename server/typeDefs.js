

const types = `
type Contact {
    id: ID!
    groupID: ID
    firstName: String
    lastName: String
    email: String
    phone: String
}

type ContactGroup {
    id: ID!
    name: String
    members: [Contact]
}

type Meeting {
    id: ID!
    subject: String
    startTime: String
    stopTime: String
    attendees: [Contact]
}

type Query {
    contacts: [Contact]
    contact(id: ID!): Contact
    contactGroups: [ContactGroup]
    contactGroup :ContactGroup
    meetings: [Meeting]
    meeting(id: ID!): Meeting
}
`

module.exports = types;

