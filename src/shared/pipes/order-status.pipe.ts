import { Pipe, PipeTransform } from '@angular/core';

import { Order } from '../../pages/order/models/order.model'

@Pipe({ name: 'orderStatus' })
export class OrderStatusPipe implements PipeTransform {
  transform(v: number, order: Order): string {
    return Order.statusMap[v] || '未知状态'
  }
}
