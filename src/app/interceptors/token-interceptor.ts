import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { Storage } from '@ionic/storage'

import { environment } from '../../environments/environment'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private url = `${environment.SERVER_URL}/api/test`

  constructor(private local: Storage, private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneParams: {
      url?: string
      headers?: HttpHeaders
    } = {}
    if (this.requestWithSelf(req.url)) {
      cloneParams.url = `${this.url}${req.url}`
      if (!this.requestWithAuth(req.url)) {
        cloneParams.headers = req.headers.set(
          'Authorization',
          'Bearer ' + this.local.get('token') // TOFIX 如何将promise接口 调整好
        )
      }
    } else {
      cloneParams.url = req.url
    }

    return next
      .handle(req.clone(cloneParams))
  }

  /**
 * 是否 与自己后台服务交互
 *
 * @private
 * @param {string} url
 * @returns {boolean}
 * @memberof ApiErrorInterceptor
 */
  private requestWithSelf(url: string): boolean {
    return !/http|assets/i.test(url)
  }
  /**
 * 是否 与自己后台服务的登录、注册请求
 *
 * @private
 * @param {string} url
 * @returns {boolean}
 * @memberof ApiErrorInterceptor
 */
  private requestWithAuth(url: string): boolean {
    return /login|register/i.test(url)
  }
}

