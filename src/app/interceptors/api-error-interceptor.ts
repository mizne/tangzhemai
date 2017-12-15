import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'

import { AlertController } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'

import { environment } from '../../environments/environment'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { ToLoginPageAction } from '../app.action'

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private store: Store<State>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (this.requestWithSelf(event.url)) {
            if (event.body && event.body.resCode !== 0) {
              throw new Error(event.body.resCode)
            }
          }
        }
      })
      .catch(res => {
        if (res instanceof HttpErrorResponse) {
          if (res.status === 401) {
            this.store.dispatch(new ToLoginPageAction())
          }

          if (res.status >= 500) {
            const alertCtrl = this.injector.get(AlertController)
            alertCtrl.create({
              title: '网络错误，请稍候重试',
              subTitle: '躺着买 遇到了意外情况，无法完成您的请求',
              buttons: ['我知道了']
            }).present()
          }
        }

        return Observable.throw(res)
      })
  }

  private requestWithSelf(url: string): boolean {
    return new RegExp(environment.SERVER_URL, 'i').test(url)
  }
}

export interface APIResponse {
  resCode: number
  resMsg: string
  result: any[]
}
