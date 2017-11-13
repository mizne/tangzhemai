import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromPurchaseIndex from '../purchase-management.reducer'
import * as fromSelectGoods from '../select-goods/select-goods.reducer'

import * as fromRoot from '../../../app/reducers'

export interface PurchaseManagementState {
  purchaseIndex: fromPurchaseIndex.State
  selectGoods: fromSelectGoods.State
}

export interface State extends fromRoot.State {
  purchaseManagement: PurchaseManagementState
}

export const reducers = {
  purchaseIndex: fromPurchaseIndex.reducer,
  selectGoods: fromSelectGoods.reducer
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
export const getSaveSuccessPurchaseUUID = createSelector(
  getPurchaseIndexState,
  fromPurchaseIndex.getSaveSuccessPurchaseUUID
)
export const getProviders = createSelector(
  getPurchaseIndexState,
  fromPurchaseIndex.getProviders
)
export const getStocks = createSelector(
  getPurchaseIndexState,
  fromPurchaseIndex.getStocks
)


export const getSelectGoodsState = createSelector(
  getPurchaseModuleState,
  (state: PurchaseManagementState) => state.selectGoods
)
export const getAllGoods = createSelector(
  getSelectGoodsState,
  fromSelectGoods.getGoodses
)
export const getAllGoodsTypes = createSelector(
  getSelectGoodsState,
  fromSelectGoods.getGoodsTypes
)