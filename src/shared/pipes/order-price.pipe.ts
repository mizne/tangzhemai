import { Pipe, PipeTransform } from '@angular/core';

import { OrderGoods } from '../../pages/salesorder-management/models/salesorder.model'

@Pipe({
  name: 'orderPrice'
})

export class OrderPricePipe implements PipeTransform {
  transform(goodses: OrderGoods[]): string {
    return goodses.reduce((accu, curr) => {
      accu += curr.count * curr.price
      return accu
    }, 0).toFixed(2)
  }
}