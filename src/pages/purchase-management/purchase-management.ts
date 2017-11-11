import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Store } from '@ngrx/store'
import { State, getCurrentPurchases, getPurchaseLoading } from './reducers'
import { FetchPurchasesAction } from './purchase-management.action'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Purchase } from './models/purchase.model'

import { DestroyService } from '../../app/services/destroy.service'

/**
 * Generated class for the PurchaseManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-management',
  templateUrl: 'purchase-management.html',
  providers: [DestroyService]
})
export class PurchaseManagementPage implements OnInit {

  loading$: Observable<boolean>
  purchases$: Observable<Purchase[]>

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

  ionViewDidEnter() {
    this.ionViewEnterSub.next()
  }

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getPurchaseLoading)
    this.purchases$ = this.store.select(getCurrentPurchases)
  }

  private initSubscriber(): void {
    this.initFetchPurchase()
  }

  private initFetchPurchase(): void {
    this.ionViewEnterSub.asObservable()
    .takeUntil(this.destroyService)
    .subscribe(() => {
      this.store.dispatch(new FetchPurchasesAction())
    })
  }

}
