import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromOrderIndex from '../order.reducer'
import * as fromRoot from '../../../app/reducers'

export interface OrderState {
  orderIndex: fromOrderIndex.State
}

export interface State extends fromRoot.State {
  order: OrderState
}

export const reducers = {
  orderIndex: fromOrderIndex.reducer
}

export const getOrderModuleState = createFeatureSelector<OrderState>('order')

export const getOrderIndexState = createSelector(getOrderModuleState, (state: OrderState) => state.orderIndex)
export const getOrderLoading = createSelector(
  getOrderIndexState,
  fromOrderIndex.getLoading
)
export const getCurrentOrders = createSelector(
  getOrderIndexState,
  fromOrderIndex.getOrders
)
