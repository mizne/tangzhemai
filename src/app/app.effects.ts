import { Injectable } from '@angular/core'
import { LoadingController, AlertController } from 'ionic-angular'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { Device } from '@ionic-native/device'

import * as fromApp from './app.action'
import { TenantService } from './services/tenant.service'
import { LoginService } from '../pages/login/login.service'
import { LoggerService } from './services/logger.service'

declare const JPush: any

@Injectable()
export class AppEffects {
  @Effect()
  login$ = this.actions$.ofType(fromApp.LOGIN)
  .map((action: fromApp.LoginAction) => action.payload)
  .switchMap(({ name, password }) => {
    let loading = this.loadCtrl.create({
      content: '登录中...'
    })
    loading.present()

    return this.loginService.login({ name, password })
    .mergeMap(resp => {
      return this.tenantService.login(resp)
    })
    .concatMap(resp => {
      loading.dismiss()
      return [
        new fromApp.LoginSuccessAction(resp),
        new fromApp.ToTabsPageAction()
      ]
    })
    .catch(() => {
      loading.dismiss()
      return Observable.of(new fromApp.LoginFailureAction())
    })
  })

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.ofType(
    fromApp.LOGIN_SUCCESS
  )
  .map((action: fromApp.LoginSuccessAction) => action.payload)
  .do(({ tenantId }) => {
    if (this.device.platform) {
      JPush.setAlias(
        {
          sequence: 1,
          alias: tenantId
        },
        () => {
          this.logger.info({
            module: 'JPush',
            method: 'setAlias',
            description: `set alias success; alias: ${tenantId}`
          })
        },
        (err) => {
          this.logger.error({
            module: 'JPush',
            method: 'setAlias',
            description: `set alias failed; err: ${err.message}`
          })
        }
      )
    }
  })

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.ofType(fromApp.LOGIN_FAILURE)
  .do(() => {
    this.alertCtrl.create({
      title: '登录错误',
      subTitle: '用户名密码不匹配',
      buttons: ['我知道了']
    }).present()
  })

  @Effect()
  logout$ = this.actions$.ofType(fromApp.LOGOUT).switchMap(() => {
    return Observable.fromPromise(this.tenantService.logout())
      .map(() => {
        return new fromApp.LogoutSuccessAction()
      })
      .catch(() => {
        return Observable.of(new fromApp.LogoutFailureAction())
      })
  })

  constructor(
    private actions$: Actions,
    private tenantService: TenantService,
    private loginService: LoginService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private device: Device,
    private logger: LoggerService
  ) {}
}
