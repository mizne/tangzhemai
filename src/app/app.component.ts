import { Component, NgZone } from '@angular/core'
import { Platform, AlertController, App } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { Device } from '@ionic-native/device'

import { Store } from '@ngrx/store'
import { ToLoginPageAction, ToTabsPageAction } from './app.action'
import { State, getRootPageState } from './reducers'

import { Observable } from 'rxjs/Observable'
import { OrderPage } from '../pages/order/order'

import { NativeService } from './services/native.service'
import { TenantService } from './services/tenant.service'
import { LoggerService } from './services/logger.service'

declare const JPush: any

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage$: Observable<any>

  private onOpenNotification: any

  private onReceiveNotification: any

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private store: Store<State>,
    private device: Device,
    private nativeService: NativeService,
    private alertCtrl: AlertController,
    private tenantService: TenantService,
    private logger: LoggerService,
    private app: App,
    private zone: NgZone
  ) {
    this.platformReady()

    this.rootPage$ = this.store.select(getRootPageState)
  }

  private platformReady(): void {
    this.platform
      .ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault()
        this.splashScreen.hide()

        this.tenantService
          .hasLogin()
          .then(() => {
            this.store.dispatch(new ToTabsPageAction())

            if (this.device.platform) {
              this.tenantService.getTenantId().then(tenantId => {
                JPush.setAlias(
                  {
                    sequence: 1,
                    alias: tenantId
                  },
                  () => {
                    this.logger.info({
                      module: 'JPush',
                      method: 'setAlias',
                      description: `set alias success; alias: ${tenantId}`
                    })
                  },
                  (err) => {
                    this.logger.error({
                      module: 'JPush',
                      method: 'setAlias',
                      description: `set alias failed; err: ${err.message}`
                    })
                  }
                )
              })
            }
          })
          .catch(() => {
            this.store.dispatch(new ToLoginPageAction())
          })

        // 真机
        if (this.nativeService.isIos() || this.nativeService.isAndroid()) {
          this.nativeService.checkNetwork()
          this.nativeService.detectionUpgrade()
        }

        return this.tenantService.getJPushID()
      })
      .then(id => {
        if (id) {
          return id
        } else {
          return this.fetchRegistrationID()
          .then(id => {
            this.logger.info({
              module: 'JPush',
              method: 'fetchRegistrationID',
              description: `fetch registration id success; id: ${id}`
            })
            return id
          })
          .catch(e => {
            this.logger.error({
              module: 'JPush',
              method: 'fetchRegistrationID',
              description: `fetch registration id failed; err: ${e.message}`
            })
          })
        }
      })
      .then(() => {
        // window.alert(`fetch jpush id success: ${id}`)
        this.initEventListeners()
      })
      .catch(e => {
        this.alertCtrl.create({
          title: '内部错误',
          message: e.message || '躺着买出错了，请稍后重试'
        })
      })
  }
  private fetchRegistrationID(): Promise<any> {
    return new Promise((resolve, reject) => {
      const maxTryCount = 100
      let tryCount = 0

      const onDeviceReady = () => {
        initiateUI()
      }

      const initiateUI = () => {
        try {
          JPush.init()
          window.setTimeout(getRegistrationID, 1000)
        } catch (exception) {
          reject(exception)
        }
      }

      const getRegistrationID = () => {
        JPush.getRegistrationID(onGetRegistrationID)
      }

      const onGetRegistrationID = data => {
        try {
          if (tryCount >= maxTryCount) {
            return reject(
              new Error('try get registration id 100 times and failed!')
            )
          }

          if (data.length == 0) {
            tryCount += 1
            window.setTimeout(getRegistrationID, 100)
          } else {
            this.tenantService.setJPushID(data)
            resolve(data)
          }
        } catch (exception) {
          reject(exception)
        }
      }

      document.addEventListener('deviceready', onDeviceReady, false)
    })
  }

  private initEventListeners(): void {
    this.onOpenNotification = () => {
      this.app.getRootNav().push(OrderPage)
    }

    this.onReceiveNotification = () => {
      // let content
      // if (this.device.platform == 'Android') {
      //   content = event.alert
      // } else {
      //   content = event.aps.alert
      // }
      // window.alert(`received notification; content: ${content}`)

      // 主动change detect(由于jpush plugin触发事件, 默认检查不到)
      this.zone.run(() => {
        // this.store.dispatch(new ReceivedOrderNotificationAction(content))
        // this.store.dispatch(new PrintLatestOrderAction(content))
      })
    }

    document.addEventListener(
      'jpush.openNotification',
      this.onOpenNotification,
      false
    )
    document.addEventListener(
      'jpush.receiveNotification',
      this.onReceiveNotification,
      false
    )
  }
}
