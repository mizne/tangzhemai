import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'

import { MyApp } from './app.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { reducers } from './reducers'
import { AppEffects } from './app.effects'
import { environment } from '../environments/environment'

import { ApiErrorInterceptor } from './interceptors/api-error-interceptor'
import { TokenInterceptor } from './interceptors/token-interceptor'

import { LoginPageModule } from '../pages/login/login.module'
import { TabsPageModule } from '../pages/tabs/tabs.module'

import { HomePageModule } from '../pages/home/home.module'
import { StatisticsPageModule } from '../pages/statistics/statistics.module'
import { MinePageModule } from '../pages/mine/mine.module'
import { OrderPageModule } from '../pages/order/order.module'
import { CheckAccountPageModule } from '../pages/check-account/check-account.module'

import { GoodsManagementPageModule } from '../pages/goods-management/goods-management.module'
import { PurchaseManagementPageModule } from '../pages/purchase-management/purchase-management.module'
import { SalesorderManagementPageModule } from '../pages/salesorder-management/salesorder-management.module'
import { StockManagementPageModule } from '../pages/stock-management/stock-management.module'
import { MoreAppsPageModule } from '../pages/more-apps/more-apps.module'

import { LoggerService } from './services/logger.service'
import { NativeService } from './services/native.service'
import { FeedbackService } from './services/feedback.service'
import { TenantService } from './services/tenant.service'
import { StatisticsService } from './services/statistics.service'
import { GoodsService } from './services/goods.service'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { Device } from '@ionic-native/device'
import { CallNumber } from '@ionic-native/call-number'
import { DeviceFeedback } from '@ionic-native/device-feedback'
import { Camera } from '@ionic-native/camera'
import { File } from '@ionic-native/file'
import { Network } from '@ionic-native/network'
import { FileTransfer } from '@ionic-native/file-transfer'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { AppVersion } from '@ionic-native/app-version'
import { FileOpener } from '@ionic-native/file-opener'

import './rxjs-imports'

// https://docs.sentry.io/clients/javascript/integrations/angular/
import * as Raven from 'raven-js'

Raven.config(
  'https://9fa0a3911d90480e9a174b06d7d03431@sentry.io/263317'
).install()

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err)
  }
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,

    LoginPageModule,
    TabsPageModule,

    HomePageModule,
    StatisticsPageModule,
    MinePageModule,
    OrderPageModule,
    CheckAccountPageModule,

    GoodsManagementPageModule,
    PurchaseManagementPageModule,
    SalesorderManagementPageModule,
    StockManagementPageModule,
    MoreAppsPageModule,

    StoreModule.forRoot(reducers),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 42
        })
      : [],
    EffectsModule.forRoot([AppEffects]),

    IonicModule.forRoot(MyApp, {
      spinner: 'crescent'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    CallNumber,
    DeviceFeedback,
    Camera,
    File,
    Network,
    FileTransfer,
    InAppBrowser,
    AppVersion,
    FileOpener,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    LoggerService,
    NativeService,
    FeedbackService,
    TenantService,
    StatisticsService,
    GoodsService
  ]
})
export class AppModule {}
