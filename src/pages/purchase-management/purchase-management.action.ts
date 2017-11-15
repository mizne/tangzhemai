import { Action } from '@ngrx/store'

import { Purchase } from './models/purchase.model'
import { Provider } from './models/provider.model'
import { Stock } from './models/stock.model'

export const FETCH_PURCHASES = '[Purchase] Fetch Purchases'
export const FETCH_PURCHASES_SUCCESS = '[Purchase] Fetch Purchases Success'
export const FETCH_PURCHASES_FAILURE = '[Purchase] Fetch Purchases Failure'

export const ADD_PURCHASE = '[Purchase] Add Purchase'
export const ADD_PURCHASE_SUCCESS = '[Purchase] Add Purchase Success'
export const ADD_PURCHASE_FAILURE = '[Purchase] Add Purchase Failure'

export const FETCH_PROVIDERS = '[Purchase] Fetch Providers'
export const FETCH_PROVIDERS_SUCCESS = '[Purchase] Fetch Providers Success'
export const FETCH_PROVIDERS_FAILURE = '[Purchase] Fetch Providers Failure'

export const ADD_PROVIDER = '[Purchase] Add Provider'
export const ADD_PROVIDER_SUCCESS = '[Purchase] Add Provider Success'
export const ADD_PROVIDER_FAILURE = '[Purchase] Add Provider Failure'

export const FETCH_STOCK = '[Purchase] Fetch Stock'
export const FETCH_STOCK_SUCCESS = '[Purchase] Fetch Stock Success'
export const FETCH_STOCK_FAILURE = '[Purchase] Fetch Stock Failure'

export enum PurchaseFilter {
  TODO, PART, DONE, DEFAULT
}
export class FetchPurchasesAction implements Action {
  readonly type = FETCH_PURCHASES
  constructor(public filter: PurchaseFilter) {}
}
export class FetchPurchasesSuccessAction implements Action {
  readonly type = FETCH_PURCHASES_SUCCESS
  constructor(public purchases: Purchase[]) {}
}
export class FetchPurchasesFailureAction implements Action {
  readonly type = FETCH_PURCHASES_FAILURE
}


export class AddPurchaseAction implements Action {
  readonly type = ADD_PURCHASE
  constructor(public purchase: Purchase) {}
}
export class AddPurchaseSuccessAction implements Action {
  readonly type = ADD_PURCHASE_SUCCESS
  constructor(public purchaseUUID: string) {}
}
export class AddPurchaseFailureAction implements Action {
  readonly type = ADD_PURCHASE_FAILURE
}


export class FetchProvidersAction implements Action {
  readonly type = FETCH_PROVIDERS
}
export class FetchProvidersSuccessAction implements Action {
  readonly type = FETCH_PROVIDERS_SUCCESS
  constructor(public providers: Provider[]) {}
}
export class FetchProvidersFailureAction implements Action {
  readonly type = FETCH_PROVIDERS_FAILURE
}


export class AddProviderAction implements Action {
  readonly type = ADD_PROVIDER
  constructor(public providerName: string) {}
}
export class AddProviderSuccessAction implements Action {
  readonly type = ADD_PROVIDER_SUCCESS
}
export class AddProviderFailureAction implements Action {
  readonly type = ADD_PROVIDER_FAILURE
}


export class FetchStockAction implements Action {
  readonly type = FETCH_STOCK
}
export class FetchStockSuccessAction implements Action {
  readonly type = FETCH_STOCK_SUCCESS
  constructor(public stocks: Stock[]) {}
}
export class FetchStockFailureAction implements Action {
  readonly type = FETCH_STOCK_FAILURE
}


export type Actions =
FetchPurchasesAction |
FetchPurchasesSuccessAction |
FetchPurchasesFailureAction |

AddPurchaseAction |
AddPurchaseSuccessAction |
AddPurchaseFailureAction |

FetchProvidersAction |
FetchProvidersSuccessAction |
FetchProvidersFailureAction |

AddProviderAction |
AddProviderSuccessAction |
AddProviderFailureAction |

FetchStockAction |
FetchStockSuccessAction |
FetchStockFailureAction
