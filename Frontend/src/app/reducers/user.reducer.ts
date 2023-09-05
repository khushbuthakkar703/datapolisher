import { Action } from '@ngrx/store'

import User from '../models/user.model';
import * as UserActions from './../actions/user.actions'

// Section 1
const initialState: User = {
    name: '',
    email: '',
    id: ''
}

// Section 2
// ActionReducer < Tutorial[], Action >
export function Userreducer(state: User | undefined, action: UserActions.Actions | any) {
    switch (action.type) {
        case UserActions.ADD_USER:
            state = action.payload
            return state;
        default:
            return state;
    }
}

