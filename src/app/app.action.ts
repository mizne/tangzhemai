import { Action } from '@ngrx/store'

export const TO_LOGIN_PAGE = '[App] To Login Page'
export const TO_TABS_PAGE = '[App] To Tabs Page'

export const LOGOUT = '[App] Logout'
export const LOGOUT_SUCCESS = '[App] Logout Success'
export const LOGOUT_FAILURE = '[App] Logout Failure'

export class ToLoginPageAction implements Action {
  readonly type = TO_LOGIN_PAGE
}

export class ToTabsPageAction implements Action {
  readonly type = TO_TABS_PAGE
}

export class LogoutAction implements Action {
  readonly type = LOGOUT
}
export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS
}
export class LogoutFailureAction implements Action {
  readonly type = LOGOUT_FAILURE
}


export type Actions =
ToLoginPageAction |
ToTabsPageAction |
LogoutAction |
LogoutSuccessAction |
LogoutFailureAction
