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

import { AlertController, NavController } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'

import { environment } from '../../environments/environment'
import { LoginPage } from '../../pages/login/login'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { ToLoginPageAction } from '../app.action'

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private url = `${environment.SERVER_URL}/api/test`

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
              console.error(`API Error; ${event.body.resMsg}`)
              throw new Error(event.body.resCode)
            }
          }
        }
      })
      .catch(res => {
        console.log(res)
        if (res instanceof HttpErrorResponse) {
          console.log('resp status: ' + res.status)
          if (res.status === 401) {
            this.store.dispatch(new ToLoginPageAction())
          }

          if (res.status >= 500) {
            const alertCtrl = this.injector.get(AlertController)
            alertCtrl.create({
              title: '内部错误，请稍候重试',
              subTitle: '小V宝 遇到了意外情况，无法完成您的请求',
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
