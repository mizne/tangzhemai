import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormControl } from '@angular/forms'

import { Store } from '@ngrx/store'
import { State, getCurrentOrders, getOrderLoading } from './reducers'
import { FetchOrdersAction } from './order.action'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Order } from './models/order.model'
import { DestroyService } from '../../app/services/destroy.service'

import { OrderDetailPage } from './order-detail/order-detail'

import fecha from 'fecha'

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [DestroyService]
})
export class OrderPage implements OnInit {

  orderTimeCtrl: FormControl = new FormControl(3)

  loading$: Observable<boolean>
  orders$: Observable<Order[]>

  ionViewEnterSub: Subject<void> = new Subject<void>()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store: Store<State>,
    private destroyService: DestroyService
  ) {
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter(): void {
    this.ionViewEnterSub.next()
  }

  ngOnInit() {
    this.initDataSource()

    this.initSubscriber()
  }

  goDetailOrder(order: Order) {
    this.navCtrl.push(OrderDetailPage, {
      order
    })
  }

  private initDataSource() {
    this.loading$ = this.store.select(getOrderLoading)
    this.orders$ = this.store.select(getCurrentOrders)
  }

  private initSubscriber(): void {
    this.initFetchOrders()
  }

  private initFetchOrders(): void {
    this.ionViewEnterSub.asObservable()
    .takeUntil(this.destroyService)
    .subscribe(() => {
      const today = fecha.format(new Date(), 'YYYY/MM/DD')
      this.store.dispatch(new FetchOrdersAction({
        startTime: today + ' 00:00:00',
        endTime: today + ' 23:59:59'
      }))
    })
  }

}
