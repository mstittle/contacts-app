
const moment = require('moment')

class DataSource {
    
    constructor() {
        console.log('data source')
    }

    getAllMeetings() {
        return meetings;
    }

    getMeeting(id) {
        return meetings.filter ( m => m.id == id)
    }

    getContacts() {
        return new Promise( resolve => setTimeout( resolve, 10000, contacts))
    }

    getContact(id) {
      //  console.log(`id:${id}`);
        let  c = contacts.filter( c => c.id == id)[0];
        console.log(contacts);
        return c;
    }

    getContactGroup(id) {
        return contactGroups.find( cg => cg.id == id)
    }

    getMeetingAttendees(meeting) {
        return meeting.attendees.map( id => this.getContact(id))
    }

    getContactGroups(group) {
        return contacts.filter( c => group.members.includes( c.id))
    }
    getTodaysMeeting() {
        return meetings.filter( m => isBetween(moment(m.startTime), moment().startOf('day'), moment().endOf('day' )));``
    }
}

const meetings = [
    {
        id:1,
        subject:'Design Session for new app',
        startTime: moment().format(),
        stopTime: moment().add(1, 'h').format(),
        location: 1,
        attendees: [1,2,3]
    },
    {
        id:2,
        subject:'QA Session for new app',
        startTime: moment().add(1, 'h').format(),
        stopTime: moment().add(2, 'h').format(),
        location: 2,
        attendees: [1,2,3]
    },
    {
        id:3,
        subject:'Deployment Session for new app',
        startTime: moment().add(2, 'h').format(),
        stopTime: moment().add(3, 'h').format(),
        location: 3,
        attendees: [1,2,3]
    }
]

const locations = [
    {
        id: 1,
        name: 'Room1',
    },
    {
        id: 2,
        name: 'Room2',
    },
    {
        id: 3,
        name: 'Room3',
    },
]

const contactGroups = [
    {
        id: 1,
        name: 'Scrum Team1',
        members: [1,2,3]
    }
]

const contacts = [
    {
        id: 1,
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bsmith@nodomain.com',
        phone: '123-123-1234',
        groupID: 1
    },
    {
        id: 2,
        firstName: 'Mary',
        lastName: 'Jones',
        email: 'mjones@nodomain.com',
        phone: '123-123-1235',
        groupID: 1
    },
    {
        id: 3,
        firstName: 'Tim',
        lastName: 'Johnson',
        email: 'tjohnson@nodomain.com',
        phone: '123-123-1236',
        groupID: 1
    },
]

module.exports = DataSource;