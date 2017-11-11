import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goodsStatus'
})
export class GoodsStatusPipe implements PipeTransform {
  transform(value: boolean): any {
    return value ? '已上架' : '已下架'
  }
}