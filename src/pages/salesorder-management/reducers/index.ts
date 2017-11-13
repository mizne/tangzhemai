import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromSalesOrderIndex from '../salesorder-management.reducer'
import * as fromSelectGoods from '../select-goods/select-goods.reducer'
import * as fromAddSalesOrder from '../add-salesorder/add-salesorder.reducer'
import * as fromRoot from '../../../app/reducers'

export interface SalesOrderManagementState {
  salesOrderIndex: fromSalesOrderIndex.State
  selectGoods: fromSelectGoods.State
  addSalesOrder: fromAddSalesOrder.State
}

export interface State extends fromRoot.State {
  salesOrderManagement: SalesOrderManagementState
}

export const reducers = {
  salesOrderIndex: fromSalesOrderIndex.reducer,
  selectGoods: fromSelectGoods.reducer,
  addSalesOrder: fromAddSalesOrder.reducer
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


export const getSelectGoodsState = createSelector(
  getSalesOrderModuleState,
  (state: SalesOrderManagementState) => state.selectGoods
)
export const getAllGoods = createSelector(
  getSelectGoodsState,
  fromSelectGoods.getGoodses
)
export const getAllGoodsTypes = createSelector(
  getSelectGoodsState,
  fromSelectGoods.getGoodsTypes
)


export const getAddSalesOrderState = createSelector(
  getSalesOrderModuleState,
  (state: SalesOrderManagementState) => state.addSalesOrder
)
export const getStocks = createSelector(
  getAddSalesOrderState,
  fromAddSalesOrder.getStocks
)
export const getSalers = createSelector(
  getAddSalesOrderState,
  fromAddSalesOrder.getSalers
)
export const getAccounts = createSelector(
  getAddSalesOrderState,
  fromAddSalesOrder.getAccounts
)
export const getSaveSuccessSalesOrderUUID = createSelector(
  getAddSalesOrderState,
  fromAddSalesOrder.getSaveSuccessSalesOrderUUID
)