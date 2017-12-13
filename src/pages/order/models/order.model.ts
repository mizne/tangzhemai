import { Food } from './food.model'
import { Coupon, CouponType } from './coupon.model'
import { EscCommand } from './esc-command.model'
import { PrintTime } from './printer-setting.model'

import * as R from 'ramda'

export class Order {
  id?: string
  /**
   * 实际支付金额
   *
   * @type {number}
   * @memberof Order
   */
  actual_amount?: number

  /**
   * 业务类型 deal 点餐; eshop 代售
   *
   * @type {('deal' | 'eshop')}
   * @memberof Order
   */
  bizType: 'deal' | 'eshop'

  /**
   * 代售商名称
   *
   * @type {string}
   * @memberof Order
   */
  consigneeName?: string

  /**
   * amount/discount/reduce
   * 优惠券类型
   *
   * @type {CouponType}
   * @memberof Order
   */
  couponType?: CouponType

  /**
   * 优惠券数值
   *
   * @type {string}
   * @memberof Order
   */
  couponValue?: string

  /**
   * 配送费
   *
   * @type {number}
   * @memberof Order
   */
  deliveryFee?: number

  /**
   * 就餐人数
   *
   * @type {number}
   * @memberof Order
   */
  dinersNum: number

  /**
   * 订单上商品
   *
   * @type {Food[]}
   * @memberof Order
   */
  foods: Food[]

  /**
   * 订单上备注信息
   *
   * @type {string}
   * @memberof Order
   */
  info: string

  /**
   * 是否vip 所下订单
   *
   * @type {boolean}
   * @memberof Order
   */
  isVip: boolean

  /**
   * 商家实收金额
   *
   * @type {number}
   * @memberof Order
   */
  merchantAmount: number

  /**
   * 商家优惠
   *
   * @type {number}
   * @memberof Order
   */
  merchantCouponFee: number

  /**
   * 下订单的支付方式
   *
   * @type {string}
   * @memberof Order
   */
  paymentMethod: string

  /**
   * 下订单人的 手机号码
   *
   * @type {string}
   * @memberof Order
   */
  phone: string

  /**
   * 平台服务费
   *
   * @type {number}
   * @memberof Order
   */
  platformAmount: number

  /**
   * 平台优惠
   *
   * @type {number}
   * @memberof Order
   */
  platformCouponFee: number

  /**
   * 退款金额
   *
   * @type {number}
   * @memberof Order
   */
  refund_amount: number

  /**
   * 退款原因
   *
   * @type {string}
   * @memberof Order
   */
  refund_reason: string

  /**
   * 0 未支付订单
   * 1 待支付订单
   * 2 已支付订单
   * 3 已核销状态订单
   *
   * @type {(0 | 1 | 2 | 3)}
   * @memberof Order
   */
  status: 0 | 1 | 2 | 3

  /**
   * 下订单 桌号
   *
   * @type {string}
   * @memberof Order
   */
  tableName: string

  /**
   * 小票文本信息
   *
   * @type {string}
   * @memberof Order
   */
  ticketText: string

  /**
   * 下订单时间
   *
   * @type {string}
   * @memberof Order
   */
  time: string

  /**
   * TODO
   *
   * @type {string}
   * @memberof Order
   */
  total_amount: string

  /**
   * 订单商品总个数
   *
   * @type {number}
   * @memberof Order
   */
  totalNum: number

  /**
   * 订单商品总价
   *
   * @type {number}
   * @memberof Order
   */
  totalPrice: number

  /**
   * 订单商品 会员总价
   *
   * @type {number}
   * @memberof Order
   */
  totalVipPrice: number

  /**
   * 订单号
   *
   * @type {string}
   * @memberof Order
   */
  trade_no: string

  constructor(order) {
    Object.keys(order).forEach(k => {
      this[k] = order[k]
    })
  }

  static orderTitleMap = {
    '0': '新订单来啦',
    '1': '待支付订单',
    '2': '已结账订单',
    '3': '已接单订单',
    '4': '已送达订单'
  }

  static statusMap = {
    '0': '未支付',
    '1': '待支付',
    '2': '已支付',
    '3': '核销状态'
  }

  static convertFromResp(resp: OrderResp): Order {
    return {
      id: resp.id,
      actual_amount: resp.actual_amount,
      bizType: resp.bizType,
      consigneeName: resp.consigneeName,
      couponType: resp.couponType,
      couponValue: resp.couponValue,
      deliveryFee: resp.deliveryFee,
      dinersNum: resp.dinersNum,
      foods: resp.foods,
      info: resp.info,
      isVip: resp.isVip,
      merchantAmount: resp.merchantAmount,
      merchantCouponFee: resp.merchantCouponFee,
      paymentMethod: resp.paymentMethod,
      phone: resp.phone,
      platformAmount: resp.platformAmount,
      platformCouponFee: resp.platformCouponFee,
      refund_amount: resp.refund_amount,
      refund_reason: resp.refund_reason,
      status: resp.status,
      tableName: resp.tableName,
      ticketText: resp.ticketText,
      time: resp.time,
      total_amount: resp.total_amount,
      totalNum: resp.totalNum,
      totalPrice: resp.totalPrice,
      totalVipPrice: resp.totalVipPrice,
      trade_no: resp.trade_no,
    }
  }

}

export interface OrderResp {
  id?: string
  actual_amount?: number
  bizType?: 'deal' | 'eshop'
  consigneeName?: string
  couponType?: CouponType
  couponValue?: string
  deliveryFee?: number
  dinersNum?: number
  foods?: Food[]
  info?: string
  isVip?: boolean
  merchantAmount?: number
  merchantCouponFee?: number
  paymentMethod?: string
  phone?: string
  platformAmount?: number
  platformCouponFee?: number
  refund_amount?: number
  refund_reason?: string
  status?: 0 | 1 | 2 | 3
  tableName?: string
  ticketText?: string
  time?: string
  total_amount?: string
  totalNum?: number
  totalPrice?: number
  totalVipPrice?: number
  trade_no?: string
}
