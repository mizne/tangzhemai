import { Action } from '@ngrx/store'
import { LoginResp } from '../pages/login/login.service'

export const TO_LOGIN_PAGE = '[App] To Login Page'
export const TO_TABS_PAGE = '[App] To Tabs Page'

export const LOGIN = '[App] Login'
export const LOGIN_SUCCESS = '[App] Login Success'
export const LOGIN_FAILURE = '[App] Login Failure'

export const LOGOUT = '[App] Logout'
export const LOGOUT_SUCCESS = '[App] Logout Success'
export const LOGOUT_FAILURE = '[App] Logout Failure'

export class ToLoginPageAction implements Action {
  readonly type = TO_LOGIN_PAGE
}
export class ToTabsPageAction implements Action {
  readonly type = TO_TABS_PAGE
}


export class LoginAction implements Action {
  readonly type = LOGIN
  constructor(public payload: {
    name: string,
    password: string
  }) {}
}
export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS
  constructor(public payload: LoginResp) {}
}
export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE
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

LoginAction |
LoginSuccessAction |
LoginFailureAction |

LogoutAction |
LogoutSuccessAction |
LogoutFailureAction
