import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import Notification from '../models/notification.model'


export const LIST_NOTIFICATION = '[NOTIFICATION] LIST'

export class Listnotification implements Action {
    readonly type = LIST_NOTIFICATION

    constructor(public payload: Notification[]) {

    }

}

export type Actions = Listnotification
