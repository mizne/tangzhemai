import { Pipe, PipeTransform } from '@angular/core';

import fecha from 'fecha'

@Pipe({
  name: 'moment'
})

export class MomentPipe implements PipeTransform {
  transform(value: string | Date, dateFormat: string = 'YYYY-MM-DD HH-mm'): string {
    const date = typeof value === 'string' ? new Date(value) : value
    return fecha.format(date, dateFormat)
  }
}