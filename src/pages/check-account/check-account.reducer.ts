import * as fromCheckAccount from './check-account.action'

import { CheckAccount } from './models/check-account.model'
import { GoodsWriteOff } from './models/goods-writeoff.model'
import { CollectMoney } from './models/collect-money.model'

export interface State {
  loading: boolean
  
  checkAccount: CheckAccount
  goodsWriteOff: GoodsWriteOff
  collectMoney: CollectMoney
}

const emptyCheckAccount: CheckAccount = {
  merchantTotalRevenue: 0, // 商家总实收
  revenueReceived: 0, // 收款实收
  goodsWriteoffRevenue: 0, // 商品核销实收
  totalRevenueNet: 0, // 总实收净额
  revenueReceivedNet: 0, // 收款实收净额
  goodsWriteoffRevenueNet: 0, // 商品核销实收净额
}

const emptyGoodsWriteOff: GoodsWriteOff = {
  goodsWriteoffRevenue: 0, // 商品核销实收
  goodsWriteoffRevenueNet: 0, // 商品核销实收净额

  goodsOrderAmount: 0, // 商品订单金额
  goodsWriteoffMerchantDiscount: 0, // 商品核销 商家优惠
  writeoffRefundAmount: 0, // 核销实退金额
  goodsWriteoffCount: 0, // 商品核销笔数
  goodsWriteoffRefundCount: 0, // 退款笔数
}

const emptyCollectMondy: CollectMoney = {
  revenueReceived: 0, // 收款实收
  revenueReceivedNet: 0, // 收款实收净额

  receivedOrderAmount: 0, // 收款订单金额
  receivedOrderMerchantDiscount: 0, // 收款订单 商家优惠
  receivedRefundAmount: 0, // 收款实退金额
  receivedOrderCount: 0, // 收款订单笔数
  receivedOrderRefundCount: 0, // 退款笔数
}

const initialState: State = {
  loading: false,

  checkAccount: emptyCheckAccount,
  goodsWriteOff: emptyGoodsWriteOff,
  collectMoney: emptyCollectMondy,
}

export function reducer(
  state: State = initialState,
  action: fromCheckAccount.Actions
): State {
  switch (action.type) {
    case fromCheckAccount.FETCH_CHECK_ACCOUNT:
      return {
        ...state,
        loading: true
      }

    case fromCheckAccount.FETCH_CHECK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload
      }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getCheckAccount = (state: State) => state.checkAccount
export const getGoodsWriteOff = (state: State) => state.goodsWriteOff
export const getCollectMoney = (state: State) => state.collectMoney
