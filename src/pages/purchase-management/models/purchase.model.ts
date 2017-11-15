import * as R from 'ramda'

import { OrderGoods } from '../../salesorder-management/models/salesorder.model'

export class Purchase {
  uuid?: string
  id?: string
  goods?: OrderGoods[]
  providerId?: string
  providerName?: string
  stockId?: string
  createdAt?: string
  discount?: number
  otherFee?: number
  paidAmount?: number
  description?: string
  totalPrice?: number

  static convertFromResp(resp: PurchaseResp): Purchase {
    return R.reject(R.isNil, {
      goods: resp.instock.map(e => ({id: e.id, count: e.num})),
      providerName: resp.supplier,
      createdAt: resp.time,
      discount: resp.discountsPrice,
      otherFee: resp.restPrice,
      paidAmount: resp.alreadyPaymentPrice,
      description: resp.info,
      totalPrice: resp.totalPrice
    })
  }

  static convertFromModel(purchase: Purchase): PurchaseResp {
    return R.reject(R.isNil, {
      instock: purchase.goods.map(e => ({
        id: e.id,
        goodsNumber: e.id,
        num: e.count
      })),
      supplierId: purchase.providerId,
      info: purchase.description,
      discountsPrice: purchase.discount,
      restPrice: purchase.otherFee,
      alreadyPaymentPrice: purchase.paidAmount,
      totalPrice: purchase.totalPrice
    })
  }
}

export interface PurchaseResp {
  instock?: PurchaseGoodsResp[]
  supplierId?: string,
  supplier?: string,
  info?: string //备注
  discountsPrice?: number //优惠金额
  restPrice?: number //其他金额(有没有包含配送费或者服务费)
  alreadyPaymentPrice?: number //已支付金额
  time?: string
  totalPrice?: number
}

export interface PurchaseGoodsResp {
  id?: number
  goodsNumber?: number
  num?: number
}
