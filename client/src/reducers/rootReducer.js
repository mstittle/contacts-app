


const contacts = [
    { id:1, firstName: 'Mike', lastName: 'Stittleburg'},
];

const store = createStore(rootReducer)

export default function rootReducer( state = contacts, action) {
    switch(action.type) {
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

