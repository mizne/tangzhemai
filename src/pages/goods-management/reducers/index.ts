import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromGoodsIndex from '../goods-management.reducer'
import * as fromRoot from '../../../app/reducers'

export interface GoodsManagementState {
  goddsIndex: fromGoodsIndex.State
}

export interface State extends fromRoot.State {
  goods: GoodsManagementState
}

export const reducers = {
  goddsIndex: fromGoodsIndex.reducer
}

export const getGoodsModuleState = createFeatureSelector<GoodsManagementState>('goods')

export const getGoodsIndexState = createSelector(getGoodsModuleState, (state: GoodsManagementState) => state.goddsIndex)
export const getTotalCount = createSelector(
  getGoodsIndexState,
  fromGoodsIndex.getGoodsTotalCount
)
export const getCurrentGoods = createSelector(
  getGoodsIndexState,
  fromGoodsIndex.getGoods
)

