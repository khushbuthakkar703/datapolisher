import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import User from '../models/user.model'

export const ADD_USER = '[USER] Add'
export const GET_USER = '[USER] Get'


export class Adduser implements Action {
    readonly type = ADD_USER

    constructor(public payload: User) { }
}

export type Actions = Adduser;
