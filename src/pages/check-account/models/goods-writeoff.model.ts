export interface GoodsWriteOff {
  goodsWriteoffRevenue: number // 商品核销实收
  goodsWriteoffRevenueNet: number // 商品核销实收净额

  goodsOrderAmount: number // 商品订单金额
  goodsWriteoffMerchantDiscount: number // 商品核销 商家优惠
  writeoffRefundAmount: number // 核销实退金额
  goodsWriteoffCount: number // 商品核销笔数
  goodsWriteoffRefundCount: number // 退款笔数
}