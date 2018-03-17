

const resolver = {
    Query: {
        contacts: (root, args, dataSource) => { 
            return dataSource.getContacts();
        },
        contact: (root, {id}, dataSource) => dataSource.getContact(id),

        contactGroups:(root, args, dataSource) => dataSource.getContactGroups(),
        contactGroup:(root, {id}, dataSource) => dataSource.getContactGroup(id),

        meeting: (root, args, dataSource) => dataSource.getMeeting(id),
        meetings: (root, {id}, dataSource) => dataSource.getMeetings(),
    }
}

module.exports = resolver;
