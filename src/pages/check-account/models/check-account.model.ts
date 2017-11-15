export interface CheckAccount {
  merchantTotalRevenue: number // 商家总实收
  revenueReceived: number // 收款实收
  goodsWriteoffRevenue: number // 商品核销实收
  totalRevenueNet: number // 总实收净额
  revenueReceivedNet: number // 收款实收净额
  goodsWriteoffRevenueNet: number // 商品核销实收净额
}