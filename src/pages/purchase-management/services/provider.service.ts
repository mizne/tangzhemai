import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { Provider } from '../models/provider.model'

import { LoggerService } from '../../../app/services/logger.service'

@Injectable()
export class ProviderService {
  private providerUrl = '/admin/supplierManage'

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  fetchProviders(
    tenantId: string,
  ): Observable<Provider[]> {
    const query = `?tenantId=${tenantId}`

      return this.http.get(this.providerUrl + query)
      .map(resp => (resp as APIResponse).result as Provider[])
      .catch(e => {
        return this.logger.httpError({
          module: 'ProviderService',
          method: 'fetchProviders',
          error: e
        })
      })
  }

  addProvider(tenantId: string, providerName: string): Observable<any> {
    return this.http.post(this.providerUrl, {
      name: providerName,
      tenantId
    })
    .map(resp => (resp as APIResponse).result)
    .catch(e => {
      return this.logger.httpError({
        module: 'ProviderService',
        method: 'addProvider',
        error: e
      })
    })
  }
}
