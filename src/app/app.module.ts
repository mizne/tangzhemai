import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { IonicStorageModule } from '@ionic/storage'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts'
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


// import { StoreModule } from '@ngrx/store'
// import { EffectsModule } from '@ngrx/effects'
// import { StoreDevtoolsModule } from '@ngrx/store-devtools'
// import { reducers } from './reducers'
// import { environment } from '../environments/environment';

import { LoginPageModule } from '../pages/login/login.module'
import { HomePageModule } from '../pages/home/home.module'
import { TabsPageModule } from '../pages/tabs/tabs.module'
import { AboutPageModule } from '../pages/about/about.module'
import { ContactPageModule } from '../pages/contact/contact.module'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    // ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginPageModule,
    HomePageModule,
    TabsPageModule,
    ContactPageModule,
    AboutPageModule,

    // PipesModule,
    // StoreModule.forRoot(reducers),
    // !environment.production
    //   ? StoreDevtoolsModule.instrument({
    //       maxAge: 42
    //     })
    //   : [],
    // EffectsModule.forRoot([]),
    IonicModule.forRoot(MyApp),
    // IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
