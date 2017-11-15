export interface CollectMoney {
  revenueReceived: number // 收款实收
  revenueReceivedNet: number // 收款实收净额

  receivedOrderAmount: number // 收款订单金额
  receivedOrderMerchantDiscount: number // 收款订单 商家优惠
  receivedRefundAmount: number // 收款实退金额
  receivedOrderCount: number // 收款订单笔数
  receivedOrderRefundCount: number // 退款笔数
}