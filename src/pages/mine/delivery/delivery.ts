import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { FormControl } from '@angular/forms'

import { Store } from '@ngrx/store'
import { State, getDeliveryEndTime, getDeliveryStartTime } from '../reducers'
import {
  FetchMerchantInfoAction,
  EditDeliveryEndTimeAction,
  EditDeliveryStartTimeAction
} from './delivery.action'

import { Observable } from 'rxjs/Observable'
import { DestroyService } from '../../../app/services/destroy.service'

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
  providers: [DestroyService]
})
export class DeliveryPage {
  startTimeCtrl: FormControl = new FormControl(null)
  endTimeCtrl: FormControl = new FormControl(null)

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private destroyService: DestroyService,
    private store: Store<State>
  ) {}

  ionViewDidLoad() {
    this.store.dispatch(new FetchMerchantInfoAction())
    this.initDataSource()
    this.initSubscriber()
  }

  private initDataSource(): void {
    this.store
      .select(getDeliveryStartTime)
      .takeUntil(this.destroyService)
      .subscribe(startTime => {
        this.startTimeCtrl.patchValue(startTime)
      })

    this.store
      .select(getDeliveryEndTime)
      .takeUntil(this.destroyService)
      .subscribe(endTime => {
        this.endTimeCtrl.patchValue(endTime)
      })
  }

  private initSubscriber(): void {
    this.startTimeCtrl.valueChanges
      .skip(1)
      .debounceTime(3e2)
      .distinctUntilChanged()
      .takeUntil(this.destroyService)
      .subscribe(startTime => {
        this.store.dispatch(new EditDeliveryStartTimeAction(startTime))
      })

    this.endTimeCtrl.valueChanges
      .skip(1)
      .debounceTime(3e2)
      .distinctUntilChanged()
      .takeUntil(this.destroyService)
      .subscribe(endTime => {
        this.store.dispatch(new EditDeliveryEndTimeAction(endTime))
      })
  }
}
