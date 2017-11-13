import * as fromSelectGoods from './select-goods.action'
import { Goods } from '../../goods-management/models/goods.model'
import { GoodsType } from '../../goods-management/models/goodsType.model'

export interface State {
  goodses: Goods[]
  goodsTypes: GoodsType[]
}

const initialState: State = {
  goodses: [],
  goodsTypes: []
}

export function reducer(
  state: State = initialState,
  action: fromSelectGoods.Actions
): State {
  switch (action.type) {
    case fromSelectGoods.FETCH_GOODS_SUCCESS:
      return {
        ...state,
        goodses: action.goodses
      }
    case fromSelectGoods.FETCH_GOODS_TYPES_SUCCESS:
      return {
        ...state,
        goodsTypes: action.goodsTypes
      }
    
    default:
      return state
  }
}

export const getGoodses = (state: State) => state.goodses
export const getGoodsTypes = (state: State) => state.goodsTypes