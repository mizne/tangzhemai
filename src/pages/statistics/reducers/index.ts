import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromOrderStatistics from '../order-statistics/order-statistics.reducer'
import * as fromGoodsStatistics from '../goods-statistics/goods-statistics.reducer'
import * as fromRoot from '../../../app/reducers'

export interface StatisticsState {
  orderStatistics: fromOrderStatistics.State
  goodsStatistics: fromGoodsStatistics.State
}

export interface State extends fromRoot.State {
  statistics: StatisticsState
}

export const reducers = {
  orderStatistics: fromOrderStatistics.reducer,
  goodsStatistics: fromGoodsStatistics.reducer
}

export const getStatisticsModuleState = createFeatureSelector<StatisticsState>(
  'statistics'
)

export const getOrderStatisticsState = createSelector(
  getStatisticsModuleState,
  (state: StatisticsState) => state.orderStatistics
)
export const getOrderStatisticsLoading = createSelector(
  getOrderStatisticsState,
  fromOrderStatistics.getLoading
)
export const getOrdersStatisticsOfToday = createSelector(
  getOrderStatisticsState,
  fromOrderStatistics.getOrdersStatisticsOfToday
)
export const getOrdersStatisticsOfThisMonth = createSelector(
  getOrderStatisticsState,
  fromOrderStatistics.getOrdersStatisticsOfThisMonth
)
export const getOrdersStatisticsOfThisYear = createSelector(
  getOrderStatisticsState,
  fromOrderStatistics.getOrdersStatisticsOfThisYear
)

export const getGoodsStatisticsState = createSelector(
  getStatisticsModuleState,
  (state: StatisticsState) => state.goodsStatistics
)
export const getGoodStatisticsLoading = createSelector(
  getGoodsStatisticsState,
  fromGoodsStatistics.getLoading
)
export const getGoodsStatisticsOfToday = createSelector(
  getGoodsStatisticsState,
  fromGoodsStatistics.getGoodsStatisticsOfToday
)
export const getGoodsStatisticsOfThisMonth = createSelector(
  getGoodsStatisticsState,
  fromGoodsStatistics.getGoodsStatisticsOfThisMonth
)
export const getGoodsStatisticsOfThisYear = createSelector(
  getGoodsStatisticsState,
  fromGoodsStatistics.getGoodsStatisticsOfThisYear
)
