import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromSelectGoods from './select-goods.action'

import { LocalService } from '../../../app/services/local.service'
import { GoodsService } from '../../../app/services/goods.service'

@Injectable()
export class SelectGoodsEffects {
  @Effect()
  fetchGoods$ = this.actions$
    .ofType(fromSelectGoods.FETCH_GOODS)
    .switchMap(() => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .fetchGoods(tenantId)
          .map(goodses => {
            return new fromSelectGoods.FetchGoodsSuccessAction(goodses)
          })
          .catch(() => {
            return Observable.of(new fromSelectGoods.FetchGoodsFailureAction())
          })
      )
    })

  @Effect()
  fetchGoodsTypes$ = this.actions$
    .ofType(fromSelectGoods.FETCH_GOODS_TYPES)
    .switchMap(() => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .fetchAllGoodsTypes(tenantId)
          .map(goodsTypes => {
            return new fromSelectGoods.FetchGoodsTypesSuccessAction(goodsTypes)
          })
          .catch(() => {
            return Observable.of(
              new fromSelectGoods.FetchGoodsTypesFailureAction()
            )
          })
      )
    })

  constructor(
    private actions$: Actions,
    private goodsService: GoodsService,
    private localService: LocalService
  ) {}
}
