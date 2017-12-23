import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { Purchase, PurchaseResp } from '../models/purchase.model'

import { PurchaseFilter } from '../purchase-management.action'
import { LoggerService } from '../../../app/services/logger.service'

@Injectable()
export class PurchaseService {
  private purchaseUrl = '/admin/inStock'

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  fetchPurchases(
    tenantId: string,
    filter: PurchaseFilter
  ): Observable<Purchase[]> {
    let query = `?tenantId=${tenantId}`
    if (filter !== PurchaseFilter.DEFAULT) {
      query += `&status=${filter}`
    }

    return this.http
      .get(this.purchaseUrl + query)
      .map(resp => (resp as APIResponse).result as PurchaseResp[])
      .map(result =>
        result.map(Purchase.convertFromResp)
      )
      .catch(e => {
        return this.logger.httpError({
          module: 'PurchaseService',
          method: 'fetchPurchases',
          error: e
        })
      })
  }

  addPurchase(tenantId: string, purchase: Purchase) {
    return this.http.post(this.purchaseUrl, {
      ...Purchase.convertFromModel(purchase),
      tenantId
    })
    .map(resp => (resp as APIResponse).result)
    .catch(e => {
      return this.logger.httpError({
        module: 'PurchaseService',
        method: 'addPurchase',
        error: e
      })
    })
  }
}
