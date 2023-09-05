import { Action } from '@ngrx/store'

import Notification from '../models/notification.model';
import * as NotificationActions from './../actions/notification.action'


// Section 1
const initialState: Notification = {
    "_id": '',
    "message": '',
    "type": '',
    "userId": '',
    "readnotification": '',
    "status": '',
    "created_date": '',
    "updated_date": '',
}

// Section 2
// ActionReducer < Tutorial[], Action >
export function Notificationreducer(state: Notification[] | undefined, action: NotificationActions.Actions | any,) {
    switch (action.type) {
        case NotificationActions.LIST_NOTIFICATION:
            state = action.payload
            return state
        default:
            return state;
    }
}

