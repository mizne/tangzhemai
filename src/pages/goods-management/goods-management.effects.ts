import { ToastController, LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromGoods from './goods-management.action'
import { GoodsService } from '../../app/services/goods.service'

import { TenantService } from '../../app/services/tenant.service'

@Injectable()
export class GoodsEffects {
  @Effect()
  fetchGoods$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS)
    .map((action: fromGoods.FetchGoodsAction) => action.payload)
    .switchMap(({ pageIndex, pageSize, goodsName, goodsType, isActive }) => {
      const load = this.loadCtrl.create({
        content: '获取商品中...'
      })
      load.present()
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .fetchGoods(
            tenantId,
            pageIndex,
            pageSize,
            goodsName,
            goodsType,
            isActive
          )
          .map(goods => {
            load.dismiss()
            return new fromGoods.FetchGoodsSuccessAction(goods)
          })
          .catch(() => {
            load.dismiss()
            return Observable.of(new fromGoods.FetchGoodsFailureAction())
          })
      )
    })

  @Effect()
  fetchGoodsCount$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS_COUNT)
    .map((action: fromGoods.FetchGoodsCountAction) => action.payload)
    .switchMap(({ goodsName, goodsType, isActive }) => {
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .fetchGoodsCount(tenantId, goodsName, goodsType, isActive)
          .map(count => new fromGoods.FetchGoodsCountSuccessAction(count))
          .catch(() =>
            Observable.of(new fromGoods.FetchGoodsCountFailureAction())
          )
      )
    })

  @Effect()
  fetchAllGoodsTypes$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS_TYPES)
    .switchMap(() => {
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .fetchAllGoodsTypes(tenantId)
          .map(
            goodsTypes => new fromGoods.FetchGoodsTypesSuccessAction(goodsTypes)
          )
          .catch(() =>
            Observable.of(new fromGoods.FetchGoodsTypesFailureAction())
          )
      )
    })

  @Effect()
  addGoodsType$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_TYPE)
    .map((action: fromGoods.AddGoodsTypeAction) => action.goodsTypeName)
    .switchMap(goodsTypeName => {
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .addGoodsType(tenantId, goodsTypeName)
          .concatMap(() => [
            new fromGoods.AddGoodsTypeSuccessAction(goodsTypeName),
            new fromGoods.FectchGoodsTypesAction()
          ])
          .catch(() =>
            Observable.of(
              new fromGoods.AddGoodsTypeFailureAction(goodsTypeName)
            )
          )
      )
    })

  @Effect({ dispatch: false })
  addGoodsTypeSuccess$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_TYPE_SUCCESS)
    .map((action: fromGoods.AddGoodsTypeSuccessAction) => action.goodsTypeName)
    .do(goodsTypeName => {
      this.toastCtrl
        .create({
          message: `添加商品类别 ${goodsTypeName} 成功`,
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect({ dispatch: false })
  addGoodsTypeFailure$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_TYPE_FAILURE)
    .map((action: fromGoods.AddGoodsTypeFailureAction) => action.goodsTypeName)
    .do(goodsTypeName => {
      this.toastCtrl
        .create({
          message: `添加商品类别 ${goodsTypeName} 失败！`,
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect()
  addGoods$ = this.actions$
    .ofType(fromGoods.ADD_GOODS)
    .map((action: fromGoods.AddGoodsAction) => action.goods)
    .switchMap(goods => {
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId => {
        const load = this.loadCtrl.create({
          content: '新增商品中...'
        })
        load.present()

        return this.goodsService
          .addGoods(tenantId, goods)
          .concatMap(() => {
            load.dismiss()
            return [
              new fromGoods.AddGoodsSuccessAction(goods.uuid),
              new fromGoods.FetchGoodsCountAction(),
              new fromGoods.FetchGoodsAction()
            ]
          })
          .catch(() => {
            load.dismiss()
            return Observable.of(
              new fromGoods.AddGoodsFailureAction()
            )
          })
      })
    })

  @Effect({ dispatch: false })
  addGoodsSuccess$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_SUCCESS)
    .do(() => {
      this.toastCtrl
        .create({
          message: `添加商品成功！`,
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect({ dispatch: false })
  addGoodsFailure$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_FAILURE)
    .do(() => {
      this.toastCtrl
        .create({
          message: `添加商品失败！`,
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect()
  fetchAllGoodsUnits$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS_UNITS)
    .switchMap(() => {
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .fetchAllGoodsUnits(tenantId)
          .map(
            goodsUnits => new fromGoods.FetchGoodsUnitsSuccessAction(goodsUnits)
          )
          .catch(() =>
            Observable.of(new fromGoods.FetchGoodsUnitsFailureAction())
          )
      )
    })

  @Effect()
  addGoodsUnit$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_UNIT)
    .map((action: fromGoods.AddGoodsUnitAction) => action.goodsUnit)
    .switchMap(goodsUnit => {
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .addGoodsUnit(tenantId, goodsUnit)
          .concatMap(() => [
            new fromGoods.AddGoodsUnitSuccessAction(goodsUnit),
            new fromGoods.FetchGoodsUnitsAction()
          ])
          .catch(() =>
            Observable.of(new fromGoods.AddGoodsUnitFailureAction(goodsUnit))
          )
      )
    })

  @Effect({ dispatch: false })
  addGoodsUnitSuccess$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_UNIT_SUCCESS)
    .map((action: fromGoods.AddGoodsUnitSuccessAction) => action.goodsUnit)
    .do(goodsUnit => {
      this.toastCtrl
        .create({
          message: `添加商品单位 ${goodsUnit} 成功！`,
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect({ dispatch: false })
  addGoodsUnitFailure$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_UNIT_FAILURE)
    .map((action: fromGoods.AddGoodsUnitFailureAction) => action.goodsUnit)
    .do(goodsUnit => {
      this.toastCtrl
        .create({
          message: `添加商品单位 ${goodsUnit} 失败！`,
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect()
  offShelfGoods$ = this.actions$
    .ofType(fromGoods.OFF_SHELF_GOODS)
    .map((action: fromGoods.OffShelfGoodsAction) => action.goodsId)
    .switchMap(goodsId => {
      const load = this.loadCtrl.create({
        content: '下架商品中...'
      })
      load.present()

      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .offShelfGoods(tenantId, goodsId)
          .concatMap(() => {
            load.dismiss()
            return [
              new fromGoods.OffShelfGoodsSuccessAction(),
              new fromGoods.FetchGoodsAction()
            ]
          })
          .catch(() => {
            load.dismiss()
            return Observable.of(new fromGoods.OffShelfGoodsFailureAction())
          })
      )
    })
  @Effect({ dispatch: false })
  offShelfGoodsSuccess$ = this.actions$
    .ofType(fromGoods.OFF_SHELF_GOODS_SUCCESS)
    .do(() => {
      this.toastCtrl
        .create({
          message: '下架商品成功！',
          duration: 3000,
          position: 'top'
        })
        .present()
    })
  @Effect({ dispatch: false })
  offShelfGoodsFailure$ = this.actions$
    .ofType(fromGoods.OFF_SHELF_GOODS_FAILURE)
    .do(() => {
      this.toastCtrl
        .create({
          message: '下架商品失败！',
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect()
  onShelfGoods$ = this.actions$
    .ofType(fromGoods.ON_SHELF_GOODS)
    .map((action: fromGoods.OnShelfGoodsAction) => action.goodsId)
    .switchMap(goodsId => {
      const load = this.loadCtrl.create({
        content: '上架商品中...'
      })
      load.present()

      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.goodsService
          .onShelfGoods(tenantId, goodsId)
          .concatMap(() => {
            load.dismiss()
            return [
              new fromGoods.OnShelfGoodsSuccessAction(),
              new fromGoods.FetchGoodsAction()
            ]
          })
          .catch(() => {
            load.dismiss()
            return Observable.of(new fromGoods.OnShelfGoodsFailureAction())
          })
      )
    })
  @Effect({ dispatch: false })
  onShelfGoodsSuccess$ = this.actions$
    .ofType(fromGoods.ON_SHELF_GOODS_SUCCESS)
    .do(() => {
      this.toastCtrl
        .create({
          message: '上架商品成功！',
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  @Effect({ dispatch: false })
  onShelfGoodsFailure$ = this.actions$
    .ofType(fromGoods.ON_SHELF_GOODS_FAILURE)
    .do(() => {
      this.toastCtrl
        .create({
          message: '上架商品失败！',
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  /**
 * 待优化 编辑成功 获取第一页的十条数据
 *
 * @memberof GoodsEffects
 */
  @Effect()
  editGoods$ = this.actions$
    .ofType(fromGoods.EDIT_GOODS)
    .map((action: fromGoods.EditGoodsAction) => action.goods)
    .switchMap(goods => {
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId => {
        return this.goodsService
          .editGoods(tenantId, goods.id, goods)
          .concatMap(() => {
            return [
              new fromGoods.EditGoodsSuccessAction(goods.uuid),
              new fromGoods.FetchGoodsAction()
            ]
          })
          .catch(() => Observable.of(new fromGoods.EditGoodsFailureAction()))
      })
    })

  @Effect({ dispatch: false })
  editGoodsSuccess$ = this.actions$
    .ofType(fromGoods.EDIT_GOODS_SUCCESS)
    .do(() => {
      this.toastCtrl
        .create({
          message: '编辑商品成功！',
          duration: 3000,
          position: 'top'
        })
        .present()
    })
  @Effect({ dispatch: false })
  editGoodsFailure$ = this.actions$
    .ofType(fromGoods.EDIT_GOODS_FAILURE)
    .do(() => {
      this.toastCtrl
        .create({
          message: '编辑商品失败！',
          duration: 3000,
          position: 'top'
        })
        .present()
    })

  constructor(
    private actions$: Actions,
    private goodsService: GoodsService,
    private tenantService: TenantService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ) {}
}
