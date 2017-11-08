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
import { environment } from '../environments/environment'

import { ApiErrorInterceptor } from './interceptors/api-error-interceptor'

import { LoginPageModule } from '../pages/login/login.module'
import { TabsPageModule } from '../pages/tabs/tabs.module'

import { HomePageModule } from '../pages/home/home.module'
import { StatisticsPageModule } from '../pages/statistics/statistics.module'
import { MinePageModule } from '../pages/mine/mine.module'
import { OrderPageModule } from '../pages/order/order.module'
import { CheckAccountPageModule } from '../pages/check-account/check-account.module'

import { AboutPageModule } from '../pages/about/about.module'
import { GoodsManagementPageModule } from '../pages/goods-management/goods-management.module'
import { AddGoodsPage } from '../pages/goods-management/add-goods/add-goods'
import { PurchaseManagementPageModule } from '../pages/purchase-management/purchase-management.module'
import { SalesorderManagementPageModule } from '../pages/salesorder-management/salesorder-management.module'
import { StockManagementPageModule } from '../pages/stock-management/stock-management.module'
import { MoreAppsPageModule } from '../pages/more-apps/more-apps.module'

import { LoggerService } from './services/logger.service'
import { NativeService } from './services/native.service'
import { FeedbackService } from './services/feedback.service'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { Device } from '@ionic-native/device'
import { CallNumber } from '@ionic-native/call-number'
import { DeviceFeedback } from '@ionic-native/device-feedback'

import './rxjs-imports'

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

    AboutPageModule,
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
    EffectsModule.forRoot([]),

    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddGoodsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    CallNumber,
    DeviceFeedback,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    LoggerService,
    NativeService,
    FeedbackService
  ]
})
export class AppModule {}
