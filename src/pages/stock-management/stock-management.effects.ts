// import { LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
// import { Effect, Actions } from '@ngrx/effects'
// import { Observable } from 'rxjs/Observable'

// import * as fromStock from './stock-management.action'
// import { StockService } from './stock.service'

// import { LocalService } from '../../app/services/local.service'

@Injectable()
export class StockEffects {
  // @Effect()
  // fetchStocks$ = this.actions$
  //   .ofType(fromStock.FETCH_STOCKS)
  //   .switchMap(() => {
  //     const load = this.loadCtrl.create({
  //       content: '获取库存中'
  //     })
  //     load.present()
  //     return Observable.fromPromise(
  //       this.localService.getTenantId()
  //     ).mergeMap(tenantId =>
  //       this.stockService
  //         .fetchStocks(tenantId)
  //         .map(stocks => {
  //           load.dismiss()
  //           return new fromStock.FetchStocksSuccessAction(stocks)
  //         })
  //         .catch(() => {
  //           load.dismiss()
  //           return Observable.of(new fromStock.FetchStocksFailureAction())
  //         })
  //     )
  //   })


  constructor(
    // private actions$: Actions,
    // private stockService: StockService,
    // private localService: LocalService,
    // private loadCtrl: LoadingController
  ) {}
}
