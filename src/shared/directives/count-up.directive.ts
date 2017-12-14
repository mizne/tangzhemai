import { Directive, ElementRef, OnInit, Input } from '@angular/core'
import * as CountUp from 'countup.js'

@Directive({ selector: '[countUp]' })
export class CountUpDirective implements OnInit {
  private countUp: CountUp
  private _startVal: number = 0
  private _endVal: number = 0
  private _decimal: number = 2
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initCountUp()
  }

  private initCountUp(): void {
    const dom = this.el.nativeElement
    this.countUp = new CountUp(
      dom,
      this._startVal,
      this._endVal,
      this._decimal,
      1.5,
      {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
      }
    )
    if (this.countUp.error) {
      console.warn(this.countUp.error)
    } else {
      this.countUp.start()
    }
  }

  @Input()
  set startVal(v: number) {
    this._startVal = typeof v === 'number' ? v : 0
  }
  @Input()
  set endVal(v: number) {
    this._endVal = typeof v === 'number' ? v : 0
    if (this.countUp) {
      this.countUp.update(this._endVal)
    }
  }
  @Input()
  set decimal(v: number) {
    this._decimal = typeof v === 'number' ? v : 2
  }
}
