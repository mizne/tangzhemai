import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { Purchase, PurchaseResp } from '../models/purchase.model'

import * as R from 'ramda'
import { PurchaseFilter } from '../purchase-management.action'

import { Storage } from '@ionic/storage'

const allProviders = [
  {
    id: '0',
    name: '测试供应商0'
  },
  {
    id: '1',
    name: '测试供应商1'
  }
]

@Injectable()
export class PurchaseService {
  private purchaseUrl = '/admin/inStock'

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  fetchPurchases(
    tenantId: string,
    filter: PurchaseFilter
  ): Observable<Purchase[]> {
    let query = `?tenantId=${tenantId}`
    if (filter !== PurchaseFilter.DEFAULT) {
      query += `&goodsStatus=${filter}`
    }
    
    // return this.http
    //   .get(this.purchaseUrl + query)
    //   .map(resp => (resp as APIResponse).result as PurchaseResp[])
    //   .map(result =>
    //     result.map(Purchase.convertFromResp)
    //   )
    //   .catch(this.handleError)

      return Observable.fromPromise(this.storage.get('FAKE_PURCHASES').then(purchases => purchases || []))
  }

  addPurchase(tenantId: string, purchase: Purchase) {
    // console.log('to add purchase ', purchase)
    // return this.http.post(this.purchaseUrl, {
    //   ...purchase,
    //   tenantId
    // })
    // .catch(this.handleError)

    const providerName = allProviders.find(e => e.id === purchase.providerId).name
    
    return Observable.fromPromise(this.storage.get('FAKE_PURCHASES'))
    .mergeMap((purchases) => {
      purchases = purchases || []
      purchases.push({
        ...purchase,
        providerName,
        createdAt: new Date()
      })

      return this.storage.set('FAKE_PURCHASES', purchases)
    })
  }

  
  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
