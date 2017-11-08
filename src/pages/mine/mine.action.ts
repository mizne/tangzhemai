import { Action } from '@ngrx/store'

export const LOGOUT = '[Mine] Logout'

export class LogoutAction implements Action {
  readonly type = LOGOUT
}

export type Actions =
LogoutAction
