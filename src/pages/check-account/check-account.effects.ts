import { ToastController, LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromCheckAccount from './check-account.action'
import { CheckAccountService } from './check-account.service'

import { LocalService } from '../../app/services/local.service'

@Injectable()
export class CheckEffects {
  @Effect()
  fetchCheckAccount$ = this.actions$
    .ofType(fromCheckAccount.FETCH_CHECK_ACCOUNT)
    .switchMap(() => {
      const load = this.loadCtrl.create({
        content: '获取商品中'
      })
      load.present()
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.checkAccountService
          .fetchGoods(tenantId)
          .map(goods => {
            load.dismiss()
            return new fromCheckAccount.FetchCheckAccountSuccessAction()
          })
          .catch(e => {
            load.dismiss()
            return Observable.of(new fromCheckAccount.FetchCheckAccountFailureAction())
          })
      )
    })

  constructor(
    private actions$: Actions,
    private checkAccountService: CheckAccountService,
    private localService: LocalService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ) {}
}
