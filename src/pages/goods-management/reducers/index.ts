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

export const getAllGoodsTypes = createSelector(
  getGoodsIndexState,
  fromGoodsIndex.getGoodsTyps
)
export const getAllGoodsUnits = createSelector(
  getGoodsIndexState,
  fromGoodsIndex.getGoodsUnits
)


export const getSaveSuccessGoodsUUID = createSelector(
  getGoodsIndexState,
  fromGoodsIndex.getSaveSuccessGoodsUUID
)

