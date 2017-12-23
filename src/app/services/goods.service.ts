import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import {
  Goods,
  GoodsResp
} from '../../pages/goods-management/models/goods.model'
import { GoodsType } from '../../pages/goods-management/models/goodsType.model'
import { GoodsUnit } from '../../pages/goods-management/models/goodsUnit.model'
import { APIResponse } from '../../app/interceptors/api-error-interceptor'
import { LoggerService } from './logger.service'

import * as R from 'ramda'

@Injectable()
export class GoodsService {
  private goodsUrl = '/admin/food'
  private goodsCountUrl = '/admin/foodByCount'
  private goodsTypeUrl = '/admin/menus'
  private goodsUnitUrl = '/admin/units'
  constructor(private http: HttpClient, private logger: LoggerService) {}

  fetchGoods(
    tenantId: string,
    pageIndex?: number,
    pageSize?: number,
    goodsName?: string,
    goodsType?: string,
    isActive?: boolean
  ): Observable<Goods[]> {
    let query = `?tenantId=${tenantId}`
    if (pageIndex) {
      query += `&pageNumber=${pageIndex}`
    }
    if (pageSize) {
      query += `&pageSize=${pageSize}`
    }
    if (goodsName) {
      query += `&name=${goodsName}`
    }
    if (goodsType) {
      query += `&menuId=${goodsType}`
    }
    if (R.is(Boolean, isActive)) {
      query += `&isActive=${isActive}`
    }
    return this.http
      .get(this.goodsUrl + query)
      .map(resp => (resp as APIResponse).result as GoodsResp[])
      .map(result => result.map(Goods.convertFromResp))
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'fetchGoods',
          error: e
        })
      })
  }

  addGoods(tenantId: string, goods: Goods): Observable<any> {
    return this.http
      .post(this.goodsUrl, {
        tenantId,
        food: Goods.convertFromModel(goods)
      })
      .map(resp => (resp as APIResponse).result)
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'addGoods',
          error: e
        })
      })
  }

  offShelfGoods(tenantId: string, goodsId: string): Observable<any> {
    return this.editGoods(tenantId, goodsId, { isActive: false })
  }

  onShelfGoods(tenantId: string, goodsId: string): Observable<any> {
    return this.editGoods(tenantId, goodsId, { isActive: true })
  }

  editGoods(tenantId: string, goodsId: string, goods: Goods): Observable<any> {
    return this.http
      .put(this.goodsUrl, {
        food: Goods.convertFromModel(goods),
        condition: {
          tenantId,
          id: goodsId
        }
      })
      .map(resp => (resp as APIResponse).result)
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'editGoods',
          error: e
        })
      })
  }

  fetchGoodsCount(
    tenantId: string,
    goodsName?: string,
    goodsType?: string,
    isActive?: boolean
  ): Observable<number> {
    let query = `/?tenantId=${tenantId}`
    if (goodsName) {
      query += `&name=${goodsName}`
    }
    if (goodsType) {
      query += `&menuId=${goodsType}`
    }
    if (R.is(Boolean, isActive)) {
      query += `&isActive=${isActive}`
    }

    return this.http
      .get(this.goodsCountUrl + query)
      .map(resp => (resp as APIResponse).result)
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'fetchGoodsCount',
          error: e
        })
      })
  }

  fetchAllGoodsTypes(tenantId: string): Observable<GoodsType[]> {
    return this.http
      .get(this.goodsTypeUrl + `/?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        result.map(e => ({
          id: e.id,
          name: e.name
        }))
      )
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'fetchAllGoodsTypes',
          error: e
        })
      })
  }

  addGoodsType(tenantId: string, goodsTypeName: string): Observable<any> {
    return this.http
      .post(this.goodsTypeUrl, {
        tenantId,
        menu: {
          name: goodsTypeName
        }
      })
      .map(resp => (resp as APIResponse).result)
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'addGoodsType',
          error: e
        })
      })
  }

  fetchAllGoodsUnits(tenantId: string): Observable<GoodsUnit[]> {
    return this.http
      .get(this.goodsUnitUrl + `?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .map(e =>
        e.map(f => ({
          id: f.id,
          name: f.goodUnit
        }))
      )
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'fetchAllGoodsUnits',
          error: e
        })
      })
  }

  addGoodsUnit(tenantId: string, goodsUnit: string): Observable<any> {
    return this.http
      .post(this.goodsUnitUrl, {
        unit: {
          tenantId,
          goodUnit: goodsUnit
        }
      })
      .map(resp => (resp as APIResponse).result)
      .catch(e => {
        return this.logger.httpError({
          module: 'GoodsService',
          method: 'addGoodsUnit',
          error: e
        })
      })
  }
}
