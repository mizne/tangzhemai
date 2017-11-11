import * as fromPurchase from './purchase-management.action'
import { Purchase } from './models/purchase.model'

export interface State {
  loading: boolean
  purchases: Purchase[]
}

const initialState: State = {
  loading: false,
  purchases: [],
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
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getPurchases = (state: State) => state.purchases
