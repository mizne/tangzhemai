import { Food } from './food.model'
import { Coupon, CouponType } from './coupon.model'
import { EscCommand } from './esc-command.model'
import { PrintTime } from './printer-setting.model'

import * as R from 'ramda'

export class Order {
  id?: string
  tradeNo?: string
  foods: Food[]
  remark: string
  payMode: string
  phone: string
  roomNo: string
  orderTime: string
  totalPrice: number

  /**
   * 0 未支付订单
   * 1 待支付订单
   * 2 已支付订单
   * 3 线下支付订单
   *
   * @type {(0 | 1 | 2 | 3)}
   * @memberof Order
   */
  status: 0 | 1 | 2 | 3

  static statusMap = {
    '0': '未支付',
    '1': '待支付',
    '2': '已支付',
    '3': '退房支付'
  }

  static convertFromResp(resp: OrderResp): Order {
    return {
      id: resp.id,
      tradeNo: resp.trade_no,
      foods: resp.foods,
      remark: resp.info,
      payMode: resp.paymentMethod,
      phone: resp.phone,
      roomNo: resp.tableName,
      orderTime: resp.time,
      status: resp.status,
      totalPrice: resp.totalPrice
    }
  }

}

export interface OrderResp {
  id?: string
  trade_no?: string
  foods?: Food[]
  info?: string
  paymentMethod?: string
  phone?: string
  status?: 0 | 1 | 2 | 3
  tableName?: string
  time?: string
  totalPrice?: number
}
