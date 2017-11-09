import { Component } from '@angular/core'
import { Platform, AlertController } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { Store } from '@ngrx/store'
import { ToLoginPageAction, ToTabsPageAction } from './app.action'
import { State, getRootPageState } from './reducers'

import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../pages/tabs/tabs'


import { NativeService } from './services/native.service'
import { LocalService } from './services/local.service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage$: Observable<any>
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private store: Store<State>,
    private nativeService: NativeService,
    private alertCtrl: AlertController,
    private localService: LocalService
  ) {
    this.platformReady()

    this.rootPage$ = this.store.select(getRootPageState)
  }

  private platformReady(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault()
      this.splashScreen.hide()


      // this.localService.clear()

      this.localService.hasLogin()
      .then(() => {
        this.store.dispatch(new ToTabsPageAction())
      })
      .catch(() => {
        this.store.dispatch(new ToLoginPageAction())
      })


      // 真机
      if (this.nativeService.isIos() || this.nativeService.isAndroid()) {
      }
    })
    .catch(e => {
      this.alertCtrl.create({
        title: '内部错误',
        message: e.message || '躺着买出错了，请稍后重试'
      })
    })
  }
}
