import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  NavController,
  NavParams,
  ViewController,
  AlertController,
  ModalController,
  ToastController,
  Loading,
  LoadingController
} from 'ionic-angular'
import { Camera } from '@ionic-native/camera'
import { File, FileEntry } from '@ionic-native/file'

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { FeedbackService } from '../../../app/services/feedback.service'
import { DestroyService } from '../../../app/services/destroy.service'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/finally'

import { GoodsType } from '../models/goodsType.model'
import { GoodsUnit } from '../models/goodsUnit.model'
import { Goods } from '../models/goods.model'

import { Store } from '@ngrx/store'
import {
  State,
  getCurrentGoods,
  getAllGoodsTypes,
  getAllGoodsUnits,
  getSaveSuccessGoodsUUID
} from '../reducers'
import {
  FectchGoodsTypesAction,
  AddGoodsTypeAction,
  FetchGoodsUnitsAction,
  AddGoodsUnitAction,
  AddGoodsAction,
  EditGoodsAction
} from '../goods-management.action'

import { environment } from '../../../environments/environment'
import * as UUID from 'uuid'

/**
 * Generated class for the AddGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum GooodsActionType {
  CREATE,
  EDIT
}
const goodsActionTypesDesc = ['新增', '编辑']

@Component({
  selector: 'page-add-goods',
  templateUrl: 'add-goods.html',
  providers: [DestroyService]
})
export class AddGoodsPage implements OnInit {
  // public myPhoto: any
  private loading: Loading

  goodsForm: FormGroup

  addGoodsTypeSub: Subject<void> = new Subject<void>()
  addGoodsUnitSub: Subject<void> = new Subject<void>()
  ionViewDidEnterSub: Subject<void> = new Subject<void>()
  cancelCreateSub: Subject<void> = new Subject<void>()
  saveSub: Subject<void> = new Subject<void>()

  allGoodsTypes$: Observable<GoodsType[]>
  allGoodsUnits$: Observable<GoodsUnit[]>

  uploadImageUrl: string
  goodsUUID: string // 用于新增商品时 标识商品
  goodsAction: GooodsActionType
  goodsActionDesc: string
  goodsToEdit: Goods

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private feedbackService: FeedbackService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private store: Store<State>,
    private destroyService: DestroyService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private file: File
  ) {}

  ngOnInit() {
    this.initNavParams()
    this.buildForm()
    this.initDataSource()
    this.initSubscriber()
  }

  ionViewDidEnter(): void {
    this.ionViewDidEnterSub.next()
  }

  toAddGoodsType(): void {
    this.addGoodsTypeSub.next()
  }

  toAddGoodsUnit(): void {
    this.addGoodsUnitSub.next()
  }

  cancel() {
    this.cancelCreateSub.next()
  }

  toSaveGoods() {
    if (this.goodsForm.valid) {
      this.saveSub.next()
    } else {
      this.toastCtrl.create({
        message: '还没有填写',
        duration: 3e3
      }).present()

      for (const ctrl of Object.keys(this.goodsForm.controls)) {
        this.goodsForm.controls[ctrl].markAsDirty()
      }
    }
    
  }

  takePhoto() {
    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true
      })
      .then(
        imageData => {
          // this.myPhoto = imageData
          this.uploadPhoto(imageData)
        },
        error => {
          this.toastCtrl
            .create({
              message: '取消拍照',
              position: 'top',
              duration: 3e3
            })
            .present()
        }
      )
  }

  selectPhoto(): void {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        quality: 100,
        encodingType: this.camera.EncodingType.PNG
      })
      .then(
        imageData => {
          // this.myPhoto = imageData
          this.uploadPhoto(imageData)
        },
        error => {
          this.toastCtrl
            .create({
              message: '取消选择照片',
              position: 'top',
              duration: 3e3
            })
            .present()
        }
      )
  }

  private uploadPhoto(imageFileUri: any): void {
    this.loading = this.loadingCtrl.create({
      content: '上传图片中...'
    })

    this.loading.present()

    this.file
      .resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err))
  }

  private readFile(file: any) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const formData = new FormData()
      const imgBlob = new Blob([reader.result], { type: file.type })
      formData.append('file', imgBlob, file.name)
      this.postData(formData)
    }
    reader.readAsArrayBuffer(file)
  }

  private postData(formData: FormData) {
    this.http
      .post(`${environment.SERVER_URL}/api/test/upload`, formData)
      .catch(e => this.handleError(e))
      .map(resp => {
        try {
          const file_path = resp.result[0]
          this.uploadImageUrl = environment.SERVER_URL + `/${file_path}`
          this.goodsForm.controls['listImageUrl'].setValue(this.uploadImageUrl)
        } catch (e) {
          return false
        }
        return true
      })
      .finally(() => this.loading.dismiss())
      .subscribe(ok => this.showToast(ok))
  }

  private showToast(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: '恭喜您， 上传图片成功！',
        duration: 3000,
        position: 'top'
      })
      toast.present()
    } else {
      const toast = this.toastCtrl.create({
        message: '上传图片失败，请稍后重试！',
        duration: 3000,
        position: 'top'
      })
      toast.present()
    }
  }

  private handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString()
    this.toastCtrl
      .create({
        message: errMsg,
        position: 'top',
        duration: 3e3
      })
      .present()
    return Observable.throw(errMsg)
  }

  private initNavParams(): void {
    this.goodsAction = this.navParams.get('action')
    this.goodsActionDesc = goodsActionTypesDesc[this.goodsAction]
    this.goodsToEdit = this.navParams.get('goods')
    this.goodsUUID = UUID()
  }

  private buildForm(): void {
    if (this.goodsAction === GooodsActionType.CREATE) {
      this.buildFormForCreate()
    }

    if (this.goodsAction === GooodsActionType.EDIT) {
      this.buildFormForEdit()
    }
  }

  private buildFormForCreate(): void {
    this.goodsForm = this.fb.group({
      name: [null, Validators.required],
      buyPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
      price: [null, [Validators.required, Validators.pattern(/\d+/)]],
      vipPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
      totalCount: [null, [Validators.required, Validators.pattern(/\d+/)]],
      goodsUnitId: [null, Validators.required],
      goodsTypeId: [null, Validators.required],
      isActive: [true, Validators.required],
      description: [null],
      listImageUrl: [null, Validators.required]
      // listImageUrl: [environment.SERVER_URL + `/test/upload/137568IMG_20171111_172801.jpg`]
    })
  }

  private buildFormForEdit(): void {
    const goods = this.goodsToEdit
    console.log('to edit goods ', goods)
    this.goodsForm = this.fb.group({
      id: [goods.id],
      name: [goods.name, Validators.required],
      buyPrice: [goods.buyPrice, Validators.required],
      price: [goods.price, Validators.required],
      vipPrice: [
        goods.vipPrice,
        [Validators.required, Validators.pattern(/\d+/)]
      ],
      totalCount: [
        goods.totalCount,
        [Validators.required, Validators.pattern(/\d+/)]
      ],
      goodsUnitId: [goods.goodsUnitId, Validators.required],
      goodsTypeId: [goods.goodsTypeId, Validators.required],
      isActive: [goods.isActive, Validators.required],
      description: [goods.description],
      listImageUrl: [goods.listImageUrl]
    })

    this.uploadImageUrl = goods.listImageUrl
  }

  private initDataSource(): void {
    this.allGoodsTypes$ = this.store.select(getAllGoodsTypes)
    this.allGoodsUnits$ = this.store.select(getAllGoodsUnits)
  }

  private initSubscriber(): void {
    this.initFetchGoodsTypesAndGoodsUnits()
    this.initAddGoodsType()
    this.initAddGoodsUnit()
    this.initCancelCreate()
    this.initCreate()
    this.initCreateSuccess()

    this.initEdit()
    this.initEditSuccess()
  }

  private initAddGoodsType(): void {
    this.addGoodsTypeSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput('商品分类')
      })
      .takeUntil(this.destroyService)
      .subscribe(goodsTypeName => {
        this.store.dispatch(new AddGoodsTypeAction(goodsTypeName))
      })
  }

  private initFetchGoodsTypesAndGoodsUnits(): void {
    this.ionViewDidEnterSub
      .asObservable()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.store.dispatch(new FectchGoodsTypesAction())
        this.store.dispatch(new FetchGoodsUnitsAction())
      })
  }

  private initAddGoodsUnit(): void {
    this.addGoodsUnitSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput('商品单位')
      })
      .takeUntil(this.destroyService)
      .subscribe(goodsUnitName => {
        this.store.dispatch(new AddGoodsUnitAction(goodsUnitName))
      })
  }

  private initCancelCreate(): void {
    this.cancelCreateSub
      .asObservable()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.alertCtrl
          .create({
            title: `放弃${this.goodsActionDesc}`,
            message: `确定放弃这次${this.goodsActionDesc}商品么?`,
            buttons: [
              {
                text: '取消',
                role: 'cancel',
                handler: () => {
                  this.feedback()
                }
              },
              {
                text: '确定',
                handler: () => {
                  this.dismiss()
                  this.feedback()
                }
              }
            ]
          })
          .present()
      })
  }

  private initCreate(): void {
    this.saveSub
      .asObservable()
      .filter(() => this.goodsAction === GooodsActionType.CREATE)
      .takeUntil(this.destroyService)
      .subscribe(() => {
        const goods = this.goodsForm.value
        console.log(goods)

        this.store.dispatch(
          new AddGoodsAction({
            ...goods,
            uuid: this.goodsUUID
          })
        )
      })
  }

  private initCreateSuccess(): void {
    this.store
      .select(getSaveSuccessGoodsUUID)
      .filter(() => this.goodsAction === GooodsActionType.CREATE)
      .filter(goodsUUID => goodsUUID === this.goodsUUID)
      .takeUntil(this.destroyService)
      .subscribe(() => {
        console.log('create success to dismiss')
        this.dismiss()
      })
  }

  private initEdit(): void {
    this.saveSub
      .asObservable()
      .filter(() => this.goodsAction === GooodsActionType.EDIT)
      .takeUntil(this.destroyService)
      .subscribe(() => {
        const goods = this.goodsForm.value

        this.store.dispatch(
          new EditGoodsAction({
            ...goods,
            uuid: this.goodsUUID
          })
        )
      })
  }

  private initEditSuccess(): void {
    this.store
      .select(getSaveSuccessGoodsUUID)
      .filter(() => this.goodsAction === GooodsActionType.EDIT)
      .filter(goodsUUID => goodsUUID === this.goodsUUID)
      .takeUntil(this.destroyService)
      .subscribe(() => {
        console.log('edit success to dismiss')
        this.dismiss()
      })
  }

  private createAlertToInput(name): Observable<string> {
    return new Observable(observer => {
      this.alertCtrl
        .create({
          title: `新增${name}`,
          inputs: [
            {
              name: 'key',
              placeholder: `${name}名称`
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                this.feedbackService.feedback()
                observer.complete()
              }
            },
            {
              text: '新增',
              handler: data => {
                this.feedbackService.feedback()
                if (data.key) {
                  observer.next(data.key)
                  observer.complete()
                } else {
                  this.toastCtrl
                    .create({
                      message: `还没有填写${name}名称`,
                      duration: 3e3
                    })
                    .present()

                  return false
                }
              }
            }
          ]
        })
        .present()
    })
  }

  private feedback(): void {
    this.feedbackService.feedback()
  }

  private dismiss(data?: any): void {
    this.viewCtrl.dismiss(data)
  }
}
