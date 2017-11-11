import { ToastController, LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromPurchase from './purchase-management.action'
import { PurchaseService } from './purchase.service'

import { LocalService } from '../../app/services/local.service'

@Injectable()
export class PurchaseEffects {
  @Effect()
  fetchPurchases$ = this.actions$
    .ofType(fromPurchase.FETCH_PURCHASES)
    .switchMap(() => {
      const load = this.loadCtrl.create({
        content: '获取采购单中'
      })
      load.present()
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.purchaseService
          .fetchPurchases(tenantId)
          .map(purchases => {
            load.dismiss()
            return new fromPurchase.FetchPurchasesSuccessAction(purchases)
          })
          .catch(e => {
            load.dismiss()
            return Observable.of(new fromPurchase.FetchPurchasesFailureAction())
          })
      )
    })

  
  constructor(
    private actions$: Actions,
    private purchaseService: PurchaseService,
    private localService: LocalService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ) {}
}
