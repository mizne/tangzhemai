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