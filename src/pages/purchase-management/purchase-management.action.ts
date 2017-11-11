import { Action } from '@ngrx/store'

import { Purchase } from './models/purchase.model'

export const FETCH_PURCHASES = '[Purchase] Fetch Purchases'
export const FETCH_PURCHASES_SUCCESS = '[Purchase] Fetch Purchases Success'
export const FETCH_PURCHASES_FAILURE = '[Purchase] Fetch Purchases Failure'



export class FetchPurchasesAction implements Action {
  readonly type = FETCH_PURCHASES
}
export class FetchPurchasesSuccessAction implements Action {
  readonly type = FETCH_PURCHASES_SUCCESS
  constructor(public purchases: Purchase[]) {}
}
export class FetchPurchasesFailureAction implements Action {
  readonly type = FETCH_PURCHASES_FAILURE
}


export type Actions =
FetchPurchasesAction |
FetchPurchasesSuccessAction |
FetchPurchasesFailureAction
