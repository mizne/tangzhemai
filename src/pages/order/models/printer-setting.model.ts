const getPrintTimeFrom: (notification: string) => PrintTime = notification => {
  if (/下单成功|修改订单成功/.test(notification)) {
    return 'ensureOrder'
  }

  if (/已结账/.test(notification)) {
    return 'ensureBill'
  }

  throw new Error(`unknown type notification; notification: ${notification}`)
}

export class PrinterSetting {
  connectMode: ConnectMode
  id?: number
  tenantId?: string
  printName: string
  deviceName: string
  printType: '58mm'
  printTime: PrintTime
  isNeedCustomSmallTicketHeader: boolean
  customSmallTicketHeader?: string
  smallTicketNum: 1 | 2 | 3 | 4
  isShowMoney: boolean
}

export type ConnectMode = 'bluetooth' | 'usb'

export type PrintTime = 'ensureOrder' | 'ensureBill' | 'takeNumber'

export { getPrintTimeFrom }