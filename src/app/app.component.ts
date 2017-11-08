import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
// import { Storage } from '@ionic/storage'

// import { Store } from '@ngrx/store'
// import { ToLoginPageAction, ToTabsPageAction } from './app.action'
// import { State, getRootPageState } from './reducers'

import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../pages/tabs/tabs'
import { LoginPage } from '../pages/login/login'


// import { NativeService } from './services/native.service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any

  rootPage$: Observable<any>

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    // private store: Store<State>,
    // private storage: Storage,
    // private nativeService: NativeService
  ) {
    this.platformReady()

    // this.rootPage$ = this.store.select(getRootPageState)
    
  }

  private platformReady(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault()
      this.splashScreen.hide()

      this.rootPage = 'TabsPage'

      // this.rootPage = TabsPage

      // this.storage.clear()

      // this.storage.get('HAS_LOGIN').then(hasLogin => {
      //   if (hasLogin) {
      //     this.store.dispatch(new ToTabsPageAction())
      //   } else {
      //     this.store.dispatch(new ToLoginPageAction())
      //   }
      // })

      // // 真机
      // if (this.nativeService.isIos() || this.nativeService.isAndroid()) {
      // }
    })
    .catch(e => {
      window.alert(JSON.stringify(e, null, 2))
    })
  }
}
