import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { FormControl } from '@angular/forms'

import { Store } from '@ngrx/store'
import { State, getDeliveryEndTime, getDeliveryStartTime } from '../reducers'
import {
  FetchMerchantInfoAction,
  EditDeliveryEndTimeAction,
  EditDeliveryStartTimeAction
} from './delivery.action'

import { DestroyService } from '../../../app/services/destroy.service'

import * as R from 'ramda'

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
    this.initDataSource()
    this.initSubscriber()
  }

  ionViewDidEnter() {
    this.store.dispatch(new FetchMerchantInfoAction())
  }

  private initDataSource(): void {
    this.store
      .select(getDeliveryStartTime)
      .filter(R.complement(R.isEmpty))
      .takeUntil(this.destroyService)
      .subscribe(startTime => {
        this.startTimeCtrl.patchValue(startTime, {
          emitEvent: false
        })
      })

    this.store
      .select(getDeliveryEndTime)
      .filter(R.complement(R.isEmpty))
      .takeUntil(this.destroyService)
      .subscribe(endTime => {
        this.endTimeCtrl.patchValue(endTime, {
          emitEvent: false
        })
      })
  }

  private initSubscriber(): void {
    this.startTimeCtrl.valueChanges
      .debounceTime(3e2)
      .distinctUntilChanged()
      .takeUntil(this.destroyService)
      .subscribe(startTime => {
        this.store.dispatch(new EditDeliveryStartTimeAction(startTime))
      })

    this.endTimeCtrl.valueChanges
      .debounceTime(3e2)
      .distinctUntilChanged()
      .takeUntil(this.destroyService)
      .subscribe(endTime => {
        this.store.dispatch(new EditDeliveryEndTimeAction(endTime))
      })
  }
}
