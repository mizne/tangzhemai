export class Coupon {
  
    /**
     * Creates an instance of Coupon.
     * @param {CouponType} type 
     * @param {string} value 
     * @memberof Coupon
     */
    constructor(public type: CouponType, public value: string) {
    }
  
    /**
     * 无门槛优惠券
     */
    static amount = 'amount'
  
    /**
     * 打折券
     */
    static discount = 'discount'
  
    /**
     * 满减券
     */
    static reduce = 'reduce'
  
    /**
     * 获取不同类型的优惠券 描述文本
     * 
     * @returns 描述文本
     * @memberof Coupon
     */
    getText(): string {
      const valueText = this.getValueText()
      const typeText = this.getTypeText()
  
      return `${valueText} ${typeText}`
    }
  
    /**
     * 获取不同类型的优惠券 类型描述文本
     * 
     * @returns 类型描述文本
     * @memberof Coupon
     */
    getTypeText(): string {
      switch (this.type) {
        case Coupon.amount:
          return `优惠券`
        case Coupon.discount:
          return `打折券`
        case Coupon.reduce:
          const [total] = this.value.split('-')
          return `满 ${total} 可用`
        default:
          console.error(`Unknown coupon type: ${this.type}`)
      }
    }
  
    /**
     * 获取不同类型的优惠券 数值描述文本
     * 
     * @returns 数值描述文本
     * @memberof Coupon
     */
    getValueText(): string {
      switch (this.type) {
        case Coupon.amount:
          return `${this.value} 元`
        case Coupon.discount:
          return `${Number(this.value) * 10} 折`
        case Coupon.reduce:
          const [, free] = this.value.split('-')
          return `${free} 元`
        default:
          console.error(`Unknown coupon type: ${this.type}`)
      }
    }
  }
  
  export type CouponType = 'amount' | 'discount' | 'reduce'
  