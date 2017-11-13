import { Component, OnInit } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'

import { Store } from '@ngrx/store'
import { State, getAllGoods, getAllGoodsTypes } from '../reducers'
import { FetchGoodsAction, FetchGoodsTypesAction } from './select-goods.action'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Goods } from '../../goods-management/models/goods.model'
import { GoodsType } from '../../goods-management/models/goodsType.model'

import { DestroyService } from '../../../app/services/destroy.service'

export interface ShowGoodsType extends GoodsType {
  count: number
}
export interface ShowGoods extends Goods {
  count: number
  show: boolean
}

type GoodsTypeOffset = {
  goodsTypeName: string
  offset: number
}

class IncrementGoodsCountAction {
  constructor(public goodsId: string) {}
}
class DecrementGoodsCountAction {
  constructor(public goodsId: string) {}
}
class SelectGoodsAction {
  constructor(public goodsTypeName: string, public isFirst: boolean) {}
}

export type GoodsActionType =
  | IncrementGoodsCountAction
  | DecrementGoodsCountAction
  | SelectGoodsAction

/**
 * Generated class for the SelectGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-salesorder-select-goods',
  templateUrl: 'select-goods.html',
  providers: [DestroyService]
})
export class SalesOrderSelectGoodsPage implements OnInit {
  ionViewEnterSub: Subject<void> = new Subject<void>()
  selectGoodsTypeSub: Subject<ShowGoodsType> = new Subject<ShowGoodsType>()
  incrementGoodsCountSub: Subject<ShowGoods> = new Subject<ShowGoods>()
  decrementGoodsCountSub: Subject<ShowGoods> = new Subject<ShowGoods>()
  chooseEndSub: Subject<void> = new Subject<void>()
  cancelSub: Subject<void> = new Subject<void>()

  allGoodsTypes$: Observable<ShowGoodsType[]>
  showGoods$: Observable<ShowGoods[]>
  selectedGoodsType$: Observable<ShowGoodsType>
  totalPrice$: Observable<string>

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private store: Store<State>,
    private destroySerive: DestroyService
  ) {}

  ionViewDidLoad() {
    console.log('page select goods ion view did load')
  }

  ionViewDidEnter() {
    console.log('page select goods ion view did enter')
    this.ionViewEnterSub.next()
  }

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  selectGoodsType(goodsType: ShowGoodsType) {
    this.selectGoodsTypeSub.next(goodsType)
  }

  increment(goods: ShowGoods) {
    this.incrementGoodsCountSub.next(goods)
  }

  decrement(goods: ShowGoods) {
    this.decrementGoodsCountSub.next(goods)
  }

  cancel() {
    this.cancelSub.next()
  }

  chooseEnd() {
    this.chooseEndSub.next()
  }

  private initDataSource(): void {
    this.initSelectGoodsType()
    this.initShowGoods()
    this.initAllGoodsTypes()
    this.initTotalPriceOfSelected()
  }

  private initSubscriber(): void {
    this.initFetchData()
    this.initChooseEnd()
    this.initCancel()
  }

  private initSelectGoodsType(): void {
    this.selectedGoodsType$ = Observable.merge(
      this.store
        .select(getAllGoodsTypes)
        .map(goodsTypes => goodsTypes.map(e => ({ ...e, count: 0 })))
        .filter(e => e.length > 0)
        .first()
        .map(e => e[0]),
      this.selectGoodsTypeSub.asObservable()
    )
  }

  private initShowGoods(): void {
    const goodsAction$: Observable<GoodsActionType> = Observable.merge(
      this.incrementGoodsCountSub
        .asObservable()
        .map(e => new IncrementGoodsCountAction(e.id)) as Observable<
        IncrementGoodsCountAction
      >,
      this.decrementGoodsCountSub
        .asObservable()
        .map(e => new DecrementGoodsCountAction(e.id)) as Observable<
        DecrementGoodsCountAction
      >,
      this.selectedGoodsType$
        .first()
        .map(e => new SelectGoodsAction(e.name, true)) as Observable<
        SelectGoodsAction
      >,
      this.selectedGoodsType$
        .skip(1)
        .map(e => new SelectGoodsAction(e.name, false)) as Observable<
        SelectGoodsAction
      >
    )

    this.showGoods$ = Observable.combineLatest(
      goodsAction$,
      this.store
        .select(getAllGoods)
        .filter(e => e.length > 0)
        .first()
        .map(goodses => {
          const lastSelectedGoodses = this.navParams.get('selectedGoodses') as ShowGoods[]

          return goodses.map(e => {
            const find = lastSelectedGoodses.find(goods => goods.id === e.id)

            return ({ ...e, count: (find && find.count) || 0, show: true })
          })
        })
    )
      .map(([actionType, showGoods]) => ({
        actionType,
        showGoods
      }))
      .scan<
        {
          actionType: GoodsActionType
          showGoods: ShowGoods[]
        },
        ShowGoods[]
      >((accu, curr): ShowGoods[] => {
        const { actionType, showGoods } = curr
        if (actionType instanceof IncrementGoodsCountAction) {
          return accu.map(goods => {
            if (goods.id === actionType.goodsId) {
              return { ...goods, count: goods.count + 1 }
            }
            return goods
          })
        }

        if (actionType instanceof DecrementGoodsCountAction) {
          return accu.map(goods => {
            if (goods.id === actionType.goodsId) {
              return { ...goods, count: goods.count - 1 }
            }
            return goods
          })
        }

        if (actionType instanceof SelectGoodsAction) {
          return (actionType.isFirst ? showGoods : accu).map(goods => {
            if (goods.goodsTypeName === actionType.goodsTypeName) {
              return { ...goods, show: true }
            } else {
              return { ...goods, show: false }
            }
          })
        }
      }, [])
  }

  private initAllGoodsTypes(): void {
    const goodsTypeOffset$: Observable<GoodsTypeOffset> = Observable.merge(
      this.store
        .select(getAllGoodsTypes)
        .filter(e => e.length > 0)
        .first()
        .mapTo({ goodsTypeName: '', offset: 0 }), // 初始选择
      this.incrementGoodsCountSub
        .asObservable()
        .map(e => ({ goodsTypeName: e.goodsTypeName, offset: 1 })),
      this.decrementGoodsCountSub
        .asObservable()
        .map(e => ({ goodsTypeName: e.goodsTypeName, offset: -1 }))
    )
    const lastSelectedGoodses = this.navParams.get('selectedGoodses') as ShowGoods[]
    const initGoodsCount = lastSelectedGoodses.reduce((accu, curr) => {
      if (typeof accu[curr.goodsTypeName] !== 'number') {
        accu[curr.goodsTypeName] = curr.count
      } else {
        accu[curr.goodsTypeName] += curr.count
      }
      return accu
    }, {})

    const goodsTypeCount$: Observable<{
      [goodsTypeName: string]: number
    }> = goodsTypeOffset$.scan((accu, current) => {
      const curr = current as GoodsTypeOffset
      if (curr.offset === 0) {
        return accu
      }
      if (typeof accu[curr.goodsTypeName] !== 'number') {
        accu[curr.goodsTypeName] = 0
      }

      accu[curr.goodsTypeName] += curr.offset
      return accu
    }, initGoodsCount)

    this.allGoodsTypes$ = goodsTypeCount$.withLatestFrom(
      this.store
        .select(getAllGoodsTypes)
        ,
      (goodsTypeCount, allGoodsTypes) => {
        return allGoodsTypes.map(e => {
          if (typeof goodsTypeCount[e.name] === 'number') {
            return { ...e, count: goodsTypeCount[e.name] }
          }
          return { ...e, count: 0 }
        })
      }
    )
  }

  private initTotalPriceOfSelected(): void {
    this.totalPrice$ = this.showGoods$
    .takeUntil(this.destroySerive)
    .map(goodses => {
      const totalPrice = goodses.reduce((accu, curr) => {
        accu += curr.count * curr.price
        return accu
      }, 0)
      return totalPrice.toFixed(2)
    })
    .startWith('0.00')
  }

 

  private initFetchData(): void {
    this.ionViewEnterSub
      .asObservable()
      .first()
      .takeUntil(this.destroySerive)
      .subscribe(() => {
        console.log('sales order fetch data')
        this.store.dispatch(new FetchGoodsAction())
        this.store.dispatch(new FetchGoodsTypesAction())
      })
  }

  private initChooseEnd(): void {
    this.chooseEndSub.asObservable()
    .withLatestFrom(this.showGoods$.map(e => e.filter(f =>f.count > 0)), (_, selectedGoodses) => selectedGoodses)
    .takeUntil(this.destroySerive)
    .subscribe(selectedGoodses => {
      this.dismiss(selectedGoodses)
    })
  }

  private initCancel(): void {
    this.cancelSub.asObservable()
    .takeUntil(this.destroySerive)
    .subscribe(() => {
      this.dismiss()
    })
  }

  private dismiss(data?: any) {
    this.viewCtrl.dismiss(data)
  }
}
