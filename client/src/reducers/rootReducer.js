
const contacts = [
    { id: 1, firstName: 'Mike', lastName: 'Stittleburg' },
];

export default function rootReducer(state = contacts, action) {
    switch (action.type) {
        case 'ADD_CONTACT':
            return [
                ...state,
                {
                    id: action.id,
                    lastName: action.lastName,
                    firstName: action.firstName
                }
            ];
        default:
            return state;

    }
}

