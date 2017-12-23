import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'

import { Order, OrderResp } from '../order/models/order.model'
import { LoggerService } from '../../app/services/logger.service'

@Injectable()
export class SalesOrderService {
  private orderUrl = '/admin/order'

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  fetchSalesOrders(
    tenantId: string,
  ): Observable<Order[]> {
    const query = `?tenantId=${tenantId}`

    return this.http
      .get(this.orderUrl + query)
      .map(resp => (resp as APIResponse).result as OrderResp[])
      .map(result =>
        result.map(Order.convertFromResp)
      )
      .catch(e => {
        return this.logger.httpError({
          module: 'SalesOrderService',
          method: 'fetchSalesOrders',
          error: e
        })
      })

  }
}
