import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Store } from '@ngrx/store'
import { State, getCurrentOrders, getOrderLoading } from './reducers'
import { FetchOrdersAction } from './order.action'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Order } from './models/order.model'

import { DestroyService } from '../../app/services/destroy.service'


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
      this.store.dispatch(new FetchOrdersAction())
    })
  }

}
