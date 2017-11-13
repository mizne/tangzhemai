import { Action } from '@ngrx/store'

import { Goods } from '../../goods-management/models/goods.model'
import { GoodsType } from '../../goods-management/models/goodsType.model'

export const FETCH_GOODS = '[SalesOrder] Fetch Goods'
export const FETCH_GOODS_SUCCESS = '[SalesOrder] Fetch Goods Success'
export const FETCH_GOODS_FAILURE = '[SalesOrder] Fetch Goods Failure'

export const FETCH_GOODS_TYPES = '[SalesOrder] Fetch Goods Types'
export const FETCH_GOODS_TYPES_SUCCESS = '[SalesOrder] Fetch Goods Types Success'
export const FETCH_GOODS_TYPES_FAILURE = '[SalesOrder] Fetch Goods Types Failure'


export class FetchGoodsAction implements Action {
  readonly type = FETCH_GOODS
}
export class FetchGoodsSuccessAction implements Action {
  readonly type = FETCH_GOODS_SUCCESS
  constructor(public goodses: Goods[]) {}
}
export class FetchGoodsFailureAction implements Action {
  readonly type = FETCH_GOODS_FAILURE
}


export class FetchGoodsTypesAction implements Action {
  readonly type = FETCH_GOODS_TYPES
}
export class FetchGoodsTypesSuccessAction implements Action {
  readonly type = FETCH_GOODS_TYPES_SUCCESS
  constructor(public goodsTypes: GoodsType[]) {}
}
export class FetchGoodsTypesFailureAction implements Action {
  readonly type = FETCH_GOODS_TYPES_FAILURE
}


export type Actions =
FetchGoodsAction |
FetchGoodsSuccessAction |
FetchGoodsFailureAction |

FetchGoodsTypesAction |
FetchGoodsTypesSuccessAction |
FetchGoodsTypesFailureAction

