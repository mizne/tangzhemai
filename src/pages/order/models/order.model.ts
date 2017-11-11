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
   * 3 已接单订单
   * 4 已送达订单
   * 
   * @type {(0 | 1 | 2 | 3 | 4)}
   * @memberof Order
   */
  status: 0 | 1 | 2 | 3 | 4

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
    '3': '已接单',
    '4': '已送达'
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
      trade_no: resp.trade_no
    }
  }

  // /**
  //  * 计算 该订单 的总金额显示
  //  * 
  //  * @returns {number} 
  //  * @memberof Order
  //  */
  // computeTotalPrice(): number {
  //   return this.deliveryFee
  //     ? this.deliveryFee + this.totalPrice
  //     : this.totalPrice
  // }

  // /**
  //  * 计算 该订单 的顾客实际支付金额
  //  * 
  //  * @returns {number} 
  //  * @memberof Order
  //  */
  // computeActualPay(): number {
  //   const result = this.totalPrice - this.platformCouponFee - this.merchantCouponFee
  //   if (this.deliveryFee) {
  //     return this.deliveryFee + result
  //   }
  //   return result
  // }

  // /**
  //  * 获取该订单的 订单状态文本描述
  //  * 
  //  * @returns {string} 
  //  * @memberof Order
  //  */
  // getOrderStatusText(): string {
  //   return Order.statusMap[this.status] || '未知状态'
  // }

  // /**
  //  * 根据订单状态 获取 打印该订单的打印时机
  //  * 
  //  * @returns {PrintTime} 
  //  * @memberof Order
  //  */
  // getPrintTime(): PrintTime {
  //   return this.status === 2 || this.status === 3 || this.status === 4
  //     ? 'ensureBill'
  //     : 'ensureOrder'
  // }

  // /**
  //  * 获取 该订单 所打印小票信息
  //  * 
  //  * @returns {string} 
  //  * @memberof Order
  //  */
  // getTicketInfo(): string {
  //   this.initTicketText().addTableNameText().addPhoneText().addGoodsText()

  //   if (this.needShowMerchantAmount()) {
  //     this.addTotalPriceText()
  //       .addMerchantCouponFeeText()
  //       .addPlatformCouponFeeText()
  //       .addPlatformAmountText()
  //       .addMerchantAmountText()
  //       .addActualPayText()
  //   }

  //   this.addTotalNumText().addDinersNumText()

  //   if (this.couponType) {
  //     this.addCouponText()
  //   }

  //   if (this.deliveryFee) {
  //     this.addDeliveryFeeText()
  //   }

  //   this.addOrderTimeText().addRemarkText()

  //   return this.ticketText
  // }

  // /**
  //  * 是否需要显示商家实收金额
  //  * 
  //  * @returns {boolean} 
  //  * @memberof Order
  //  */
  // needShowMerchantAmount(): boolean {
  //   return this.status == 2 || this.status === 3 || this.status === 4
  // }

  // /**
  //  * 初始化 小票文本信息
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private initTicketText(): Order {
  //   this.ticketText = `${EscCommand.DOUBLE_ON}${this.consigneeName
  //     ? `e代售 ${this.consigneeName}`
  //     : ''} \n\n
  //   ${this.getTicketTitle()}\n\n${EscCommand.DOUBLE_OFF}`
  //   return this
  // }

  // /**
  //  * 添加 桌号 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addTableNameText(): Order {
  //   this.ticketText += `桌号: ${this.tableName}\n\n`
  //   return this
  // }

  // /**
  //  * 添加 电话 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addPhoneText(): Order {
  //   this.ticketText += `电话:${this.phone}${this.isVip ? '(会员)' : ''}\n\n`
  //   return this
  // }

  // /**
  //  * 添加 商品 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addGoodsText(): Order {
  //   this.ticketText += `名称    单价(普通/会员)    数量\n\n`

  //   this.foods.forEach(food => {
  //     this.ticketText += `${food.name} ${food.price}/${food.vipPrice}元 x${food.num}\n\n`
  //   })

  //   return this
  // }

  // /**
  //  * 添加 总价小计 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addTotalPriceText(): Order {
  //   this.ticketText += `总价小计:            ￥${this.totalPrice}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 商家活动支出 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addMerchantCouponFeeText(): Order {
  //   this.ticketText += `商家活动支出:        -￥${this.merchantCouponFee}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 平台活动支出 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addPlatformCouponFeeText(): Order {
  //   this.ticketText += `平台活动支出:        -￥${this.platformCouponFee}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 平台服务费 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addPlatformAmountText(): Order {
  //   this.ticketText += `平台服务费:        -￥${this.platformAmount}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 本单预计收入 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addMerchantAmountText(): Order {
  //   this.ticketText += `本单预计收入:      ￥${this.merchantAmount}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 本单顾客实际支付 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addActualPayText(): Order {
  //   this.ticketText += `本单顾客实际支付:    ￥${this.computeActualPay()}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 总份数 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addTotalNumText(): Order {
  //   this.ticketText += `总份数:   ${this.totalNum}份\n\n`

  //   return this
  // }

  // /**
  //  * 添加 就餐人数 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addDinersNumText(): Order {
  //   this.ticketText += `人数:${this.dinersNum}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 使用优惠券 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addCouponText(): Order {
  //   const coupon = new Coupon(this.couponType, this.couponValue)
  //   this.ticketText += `已使用优惠券: ${coupon.getText()}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 配送费 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addDeliveryFeeText(): Order {
  //   this.ticketText += `配送费: ${this.deliveryFee} 元\n\n`

  //   return this
  // }

  // /**
  //  * 添加 下单时间 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addOrderTimeText(): Order {
  //   this.ticketText += `下单时间:  ${this.time}\n\n`

  //   return this
  // }

  // /**
  //  * 添加 订单备注 文本
  //  * 
  //  * @private
  //  * @returns {Order} 
  //  * @memberof Order
  //  */
  // private addRemarkText(): Order {
  //   this.ticketText += `备注:    ${this.info}\n\n\n\n`

  //   return this
  // }

  // /**
  //  * 获取 打印小票的 头信息
  //  * 
  //  * @private
  //  * @returns {string} 
  //  * @memberof Order
  //  */
  // private getTicketTitle(): string {
  //   const originalTitle = Order.orderTitleMap[this.status]

  //   return this.isVip ? `VIP ${originalTitle}` : originalTitle
  // }
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
  status?: 0 | 1 | 2 | 3 | 4
  tableName?: string
  ticketText?: string
  time?: string
  total_amount?: string
  totalNum?: number
  totalPrice?: number
  totalVipPrice?: number
  trade_no?: string
}
