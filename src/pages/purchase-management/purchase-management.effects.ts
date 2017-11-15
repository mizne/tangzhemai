import { ToastController, LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromPurchase from './purchase-management.action'
import { PurchaseService } from './services/purchase.service'
import { ProviderService } from './services/provider.service'
import { StockService } from './services/stock.service'

import { LocalService } from '../../app/services/local.service'

@Injectable()
export class PurchaseEffects {
  @Effect()
  fetchPurchases$ = this.actions$
    .ofType(fromPurchase.FETCH_PURCHASES)
    .map((action: fromPurchase.FetchPurchasesAction) => action.filter)
    .switchMap((filter) => {
      const load = this.loadCtrl.create({
        content: '获取采购单中'
      })
      load.present()
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.purchaseService
          .fetchPurchases(tenantId, filter)
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

  @Effect()
  addPurchase$ = this.actions$.ofType(fromPurchase.ADD_PURCHASE)
  .map((action: fromPurchase.AddPurchaseAction) => action.purchase)
  .switchMap((purchase) => {
    const load = this.loadCtrl.create({
      content: '新增采购单中'
    })
    load.present()
    return Observable.fromPromise(
      this.localService.getTenantId()
    ).mergeMap(tenantId =>
      this.purchaseService
        .addPurchase(tenantId, purchase)
        .concatMap(() => {
          load.dismiss()
          return [
            new fromPurchase.AddPurchaseSuccessAction(purchase.uuid),
            new fromPurchase.FetchPurchasesAction(0)
          ]
        })
        .catch(e => {
          load.dismiss()
          return Observable.of(new fromPurchase.AddPurchaseFailureAction())
        })
    )
  })

  @Effect({ dispatch: false })
  addPurchaseSuccess$ = this.actions$.ofType(fromPurchase.ADD_PURCHASE_SUCCESS)
  .do(() => {
    this.toastCtrl.create({
      message: '恭喜您 新增采购单成功',
      position: 'top',
      duration: 3e3
    }).present()
  })

  @Effect({ dispatch: false })
  addPurchaseFailure$ = this.actions$.ofType(fromPurchase.ADD_PURCHASE_FAILURE)
  .do(() => {
    this.toastCtrl.create({
      message: '新增采购单失败',
      position: 'top',
      duration: 3e3
    }).present()
  })

  @Effect()
  fetchProviders$ = this.actions$
    .ofType(fromPurchase.FETCH_PROVIDERS)
    .switchMap(() => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.providerService
          .fetchProviders(tenantId)
          .map(providers => {
            return new fromPurchase.FetchProvidersSuccessAction(providers)
          })
          .catch(e => {
            return Observable.of(new fromPurchase.FetchProvidersFailureAction())
          })
      )
    })

    @Effect()
    addProvider$ = this.actions$.ofType(fromPurchase.ADD_PROVIDER)
    .map((action: fromPurchase.AddProviderAction) => action.providerName)
    .switchMap((providerName) => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.providerService
          .addProvider(tenantId, providerName)
          .concatMap(() => {
            return [
              new fromPurchase.AddProviderSuccessAction(),
              new fromPurchase.FetchProvidersAction()
            ]
          })
          .catch(e => {
            return Observable.of(new fromPurchase.AddProviderFailureAction())
          })
      )
    })

    @Effect({ dispatch: false })
    addProviderSuccess$ = this.actions$.ofType(fromPurchase.ADD_PROVIDER_SUCCESS)
    .do(() => {
      this.toastCtrl.create({
        message: '恭喜您 添加供应商成功！',
        duration: 3e3,
        position: 'top'
      }).present()
    })

    @Effect({ dispatch: false })
    addProviderFailure$ = this.actions$.ofType(fromPurchase.ADD_PROVIDER_FAILURE)
    .do(() => {
      this.toastCtrl.create({
        message: '添加供应商失败！',
        duration: 3e3,
        position: 'top'
      }).present()
    })

  @Effect()
  fetchStocks$ = this.actions$
    .ofType(fromPurchase.FETCH_STOCK)
    .switchMap(() => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.stockService
          .fetchStocks(tenantId)
          .map(stocks => {
            return new fromPurchase.FetchStockSuccessAction(stocks)
          })
          .catch(e => {
            return Observable.of(new fromPurchase.FetchStockFailureAction())
          })
      )
    })

  constructor(
    private actions$: Actions,
    private purchaseService: PurchaseService,
    private providerService: ProviderService,
    private stockService: StockService,
    private localService: LocalService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ) {}
}
