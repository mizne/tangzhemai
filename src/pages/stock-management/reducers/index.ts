import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromStockIndex from '../stock-management.reducer'
import * as fromRoot from '../../../app/reducers'

export interface StockManagementState {
  stockIndex: fromStockIndex.State
}

export interface State extends fromRoot.State {
  stockManagement: StockManagementState
}

export const reducers = {
  stockIndex: fromStockIndex.reducer
}

export const getStockModuleState = createFeatureSelector<StockManagementState>('stockManagement')

export const getStockIndexState = createSelector(
  getStockModuleState, 
  (state: StockManagementState) => state.stockIndex
)
export const getStockLoading = createSelector(
  getStockIndexState,
  fromStockIndex.getLoading
)
export const getCurrentStocks = createSelector(
  getStockIndexState,
  fromStockIndex.getStocks
)
