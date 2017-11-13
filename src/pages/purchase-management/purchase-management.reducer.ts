import * as fromPurchase from './purchase-management.action'
import { Purchase } from './models/purchase.model'
import { Provider } from './models/provider.model'
import { Stock } from './models/stock.model'

export interface State {
  loading: boolean
  purchases: Purchase[]

  saveSuccessPurchaseUUID: string
  providers: Provider[]
  stocks: Stock[]
}

const initialState: State = {
  loading: false,
  purchases: [],

  saveSuccessPurchaseUUID: '',
  providers: [],
  stocks: []
}

export function reducer(
  state: State = initialState,
  action: fromPurchase.Actions
): State {
  switch (action.type) {
    case fromPurchase.FETCH_PURCHASES:
      return {
        ...state,
        loading: true
      }
    case fromPurchase.FETCH_PURCHASES_SUCCESS:
      return {
        ...state,
        loading: false,
        purchases: action.purchases
      }
    case fromPurchase.FETCH_PURCHASES_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromPurchase.ADD_PURCHASE_SUCCESS:
      return {
        ...state,
        saveSuccessPurchaseUUID: action.purchaseUUID
      }
    case fromPurchase.FETCH_PROVIDERS_SUCCESS: 
      return {
        ...state,
        providers: action.providers
      }
    case fromPurchase.FETCH_STOCK_SUCCESS:
      return {
        ...state,
        stocks: action.stocks
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getPurchases = (state: State) => state.purchases
export const getSaveSuccessPurchaseUUID = (state: State) => state.saveSuccessPurchaseUUID
export const getProviders = (state: State) => state.providers
export const getStocks = (state: State) => state.stocks