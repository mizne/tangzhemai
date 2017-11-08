import { Action } from '@ngrx/store'

export const TO_LOGIN_PAGE = '[App] To Login Page'
export const TO_TABS_PAGE = '[App] To Tabs Page'
export const LOGOUT = '[App] Logout'

export class ToLoginPageAction implements Action {
  readonly type = TO_LOGIN_PAGE
}
export class ToTabsPageAction implements Action {
  readonly type = TO_TABS_PAGE
}
export class LogoutAction implements Action {
  readonly type = LOGOUT
}


export type Actions = 
ToLoginPageAction | 
ToTabsPageAction |
LogoutAction 