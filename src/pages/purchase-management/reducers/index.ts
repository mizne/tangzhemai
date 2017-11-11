import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromPurchaseIndex from '../purchase-management.reducer'
import * as fromRoot from '../../../app/reducers'

export interface PurchaseManagementState {
  purchaseIndex: fromPurchaseIndex.State
}

export interface State extends fromRoot.State {
  purchaseManagement: PurchaseManagementState
}

export const reducers = {
  purchaseIndex: fromPurchaseIndex.reducer
}

export const getPurchaseModuleState = createFeatureSelector<PurchaseManagementState>('purchaseManagement')

export const getPurchaseIndexState = createSelector(
  getPurchaseModuleState, 
  (state: PurchaseManagementState) => state.purchaseIndex
)
export const getPurchaseLoading = createSelector(
  getPurchaseIndexState,
  fromPurchaseIndex.getLoading
)
export const getCurrentPurchases = createSelector(
  getPurchaseIndexState,
  fromPurchaseIndex.getPurchases
)
