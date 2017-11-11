import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromSalesOrderIndex from '../salesorder-management.reducer'
import * as fromRoot from '../../../app/reducers'

export interface SalesOrderManagementState {
  salesOrderIndex: fromSalesOrderIndex.State
}

export interface State extends fromRoot.State {
  salesOrderManagement: SalesOrderManagementState
}

export const reducers = {
  salesOrderIndex: fromSalesOrderIndex.reducer
}

export const getSalesOrderModuleState = createFeatureSelector<SalesOrderManagementState>('salesOrderManagement')

export const getSalesOrderIndexState = createSelector(
  getSalesOrderModuleState, 
  (state: SalesOrderManagementState) => state.salesOrderIndex
)
export const getSalesOrderLoading = createSelector(
  getSalesOrderIndexState,
  fromSalesOrderIndex.getLoading
)
export const getCurrentSalesOrders = createSelector(
  getSalesOrderIndexState,
  fromSalesOrderIndex.getSalesOrders
)
