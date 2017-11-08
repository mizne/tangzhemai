import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { reducers } from './reducers'
import { environment } from '../environments/environment';

import { ApiErrorInterceptor } from './interceptors/api-error-interceptor'

// import { AboutPage } from '../pages/about/about';
// import { StatisticsPage } from '../pages/statistics/statistics';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { TabsPageModule } from '../pages/tabs/tabs.module'
import { HomerPageModule } from '../pages/home/home.module'
import { LoginPageModule } from '../pages/login/login.module'
import { MinePageModule } from '../pages/mine/mine.module'
import { StatisticsPageModule } from '../pages/statistics/statistics.module'
import { OrderPageModule } from '../pages/order/order.module'
import { AboutPageModule } from '../pages/about/about.module'

import { LoggerService } from './services/logger.service'
import { NativeService } from './services/native.service'
import { FeedbackService } from './services/feedback.service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device'
import { CallNumber } from '@ionic-native/call-number'
import { DeviceFeedback } from '@ionic-native/device-feedback'

import './rxjs-imports'


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TabsPageModule,
    HomerPageModule,
    LoginPageModule,
    MinePageModule,
    StatisticsPageModule,
    OrderPageModule,
    AboutPageModule,

    StoreModule.forRoot(reducers),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 42
        })
      : [],
    EffectsModule.forRoot([]),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    CallNumber,
    DeviceFeedback,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    LoggerService,
    NativeService,
    FeedbackService
  ]
})
export class AppModule {}
