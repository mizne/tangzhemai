import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version'

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  version: Promise<string>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appVersion: AppVersion
  ) {
  }

  ionViewDidLoad() {
    this.version = this.appVersion.getVersionNumber()
  }

}
