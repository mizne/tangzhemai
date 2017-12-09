export class StatisticsItem {
  consigneeAmount: FieldItem
  merchantAmount: FieldItem
  merchantCouponFee: FieldItem
  merchantPayment: FieldItem
  num: FieldItem
  platformAmount: FieldItem
  platformCouponFee: FieldItem
  time: FieldItem
  totalPrice: FieldItem
}

export class FieldItem {
  name: string
  value: string
}

export class GoodsStatistics {
  name?: string
  num?: number
  amount?: number
  static convertFromResp(resp: GoodsStatisticsResp): GoodsStatistics {
    return {
      name: resp.goodsName,
      num: resp.num,
      amount: resp.price * resp.num
    }
  }
}

export interface GoodsStatisticsResp {
  goodsName?: string
  num: number
  price: number
  consume: number
  vipConsume: number
  time: string
}
