import { Component, OnInit } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  ModalController 
} from 'ionic-angular';
import { FormControl } from '@angular/forms'

import { Store } from '@ngrx/store'
import { State, getCurrentPurchases, getPurchaseLoading } from './reducers'
import { FetchPurchasesAction } from './purchase-management.action'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Purchase } from './models/purchase.model'

import { DestroyService } from '../../app/services/destroy.service'
import { FeedbackService } from '../../app/services/feedback.service'

import { AddPurchasePage } from './add-purchase/add-purchase'

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

  statusCtrl: FormControl = new FormControl(3)

  loading$: Observable<boolean>
  purchases$: Observable<Purchase[]>

  ionViewEnterSub: Subject<void> = new Subject<void>()
  addPurchaseSub: Subject<void> = new Subject<void>()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private store: Store<State>,
    private destroyService: DestroyService,
    private feedbackService: FeedbackService
  ) {
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.ionViewEnterSub.next()
  }

  toAddPurchase() {
    this.addPurchaseSub.next()
  }

  segmentChanged(ev) {
    console.log(ev)
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
    this.initAddPurchase()
  }

  private initFetchPurchase(): void {
    const statusChanges = this.statusCtrl.valueChanges.startWith(3)

    Observable.merge(
      this.ionViewEnterSub,
      this.statusCtrl.valueChanges
    )
    .withLatestFrom(statusChanges, (_, status) => status)
    .takeUntil(this.destroyService)
    .subscribe(status => {
      console.log(status)
      this.store.dispatch(new FetchPurchasesAction(status))
    })
  }

  private initAddPurchase(): void {
    this.addPurchaseSub
    .asObservable()
    .do(_ => {
      this.feedbackService.feedback()
    })
    .takeUntil(this.destroyService)
    .subscribe(data => {
      this.modalCtrl.create(AddPurchasePage).present()
    })
  }

}
